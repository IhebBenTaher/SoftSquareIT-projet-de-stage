<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Panier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Client;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\ClientRepository;
use App\Entity\User;
use App\Entity\Commande;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
* @Route("/panier", name="app_panier")
*/
class PanierController extends AbstractController
{
    /**
     * @Route("/{username}/panier", name="_show", methods={"GET"})
     */
    public function getPanier(Client $client,SerializerInterface $si): Response
    {
        $panier=$client->getPanier();
        $data = $si->serialize($panier, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            'include_metadata' => true,
            'attributes' => [
                'liste',
            ]
        ]);
        return new JsonResponse($data, 200, [], true);
    }
    /**
     * @Route("/{username}/edit", name="_edit", methods={"PUT"})
     */
    public function edit(Client $client,Request $req,EntityManagerInterface $em): Response
    {
        $data=json_decode($req->getContent(),true);
        $panier=$client->getPanier();
        $liste=$panier->getListe();
        $exists = false;
        $i=0;
        foreach ($liste as $obj) {
            if ($obj['name'] == $data['liste'][0]['name']) {
                $exists = true;
                break;
            }
            $i++;
        }
        if($exists){
            $newValue=["name"=>$liste[$i]["name"],"price"=>$liste[$i]["price"],"quantity"=>$liste[$i]["quantity"]+1,"image"=>$liste[$i]["image"]];
            array_splice($liste, $i, 1, [$newValue]);
        }
        else{
            $liste[] = $data['liste'][0];
        }
        $panier->setListe($liste);
        $em->persist($panier);
        $em->flush();
        return new JsonResponse("Pnaier modified");
    }

    /**
     * @Route("/{username}/put", name="_put", methods={"PUT"})
     */
    public function put(Client $client,Request $req,EntityManagerInterface $em): Response
    {
        $data=json_decode($req->getContent(),true);
        $panier=$client->getPanier();
        $panier->setListe($data['liste']);
        $em->persist($panier);
        $em->flush();
        return new JsonResponse("Pnaier modified");
    }
    /**
     * @Route("/{username}/commande", name="_commande")
     */
    public function commande(Client $client,Request $req,EntityManagerInterface $em): Response
    {
        $data=json_decode($req->getContent(),true);
        $panier=$client->getPanier();
        $panier->setListe([]);
        $c=new Commande();
        $c->setListe($data['liste']);
        $c->setClient($client);
        $em->persist($c);
        $em->persist($panier);
        $em->flush();
        return new JsonResponse("Pnaier modified");
    }
}
