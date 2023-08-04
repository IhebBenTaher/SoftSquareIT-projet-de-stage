<?php

namespace App\Services;

use App\Entity\Categorie;
use App\Form\CategorieType;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\VarDumper\VarDumper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ArticleRepository;
use Symfony\Component\Serializer\SerializerInterface;
use App\Services\CategorieService;

class CategorieService{
    private $si;
    private $cr;
    private $em;
    public function __construct(SerializerInterface $si,CategorieRepository $cr,EntityManagerInterface $em)
    {
        $this->si = $si;
        $this->cr = $cr;
        $this->em = $em;
    }
    public function getCategories(){
        $categories=$this->cr->findAll();
        $data = $this->si->serialize($categories, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            'include_metadata' => true,
            'attributes' => [
                'id',
                'name',
                'image',
            ]
        ]);
        return new JsonResponse($data, 200, [], true);
    }
    public function getCategorie($id){
        $category = $this->cr->find($id);
        $data = $this->si->serialize($category, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new JsonResponse($data, 200, [], true);
    }
    public function deleteCategorie(Categorie $e){
        $this->em->remove($e);
        $this->em->flush();
        return new JsonResponse("article deleted");
    }
    public function save(Categorie $e){
        $this->em->persist($e);
        $this->em->flush();
        return new JsonResponse('Form submitted successfully');
    }
}