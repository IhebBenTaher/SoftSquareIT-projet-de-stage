<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CommandeRepository;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/commande", name="app_commande")
 */
class CommandeController extends AbstractController
{
    /**
     * @Route("/", name="_index", methods={"GET"})
     */
    public function index(CommandeRepository $cr,SerializerInterface $si): Response
    {
        $commandes=$cr->findAll();
        $data = $si->serialize($commandes, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            'include_metadata' => true//,
            // 'attributes' => [
            //     'id',
            //     'name',
            //     'image',
            // ]
        ]);
        return new JsonResponse($data, 200, [], true);
    }
}
