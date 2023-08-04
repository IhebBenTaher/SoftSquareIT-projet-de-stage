<?php

namespace App\Services;

use App\Entity\Article;
use App\Entity\Image;
use App\Entity\Categorie;
use App\Form\ArticleType;
use App\Repository\ArticleRepository;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ArticleService{
    private $si;
    private $ar;
    private $em;
    public function __construct(SerializerInterface $si,ArticleRepository $ar,EntityManagerInterface $em)
    {
        $this->si = $si;
        $this->ar = $ar;
        $this->em = $em;
    }
    public function getArticles(){
        $articles=$this->ar->findAll();
        $data = $this->si->serialize($articles, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            },
            'include_metadata' => true,
            'attributes' => [
                'id',
                'name',
                'description',
                'fulldescription',
                'price',
                'image',
                'images',
                'categorie' => [
                    'name'
                ]
            ]
        ]);
        return new JsonResponse($data, 200, [], true);
    }
    public function getArticle($id){
        $e=$this->ar->find($id);
        $data = $this->si->serialize($e, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new JsonResponse($data, 200, [], true);
    }
    public function deleteArticle(Article $a){
        $this->em->remove($a);
        $this->em->flush();
        return new JsonResponse("article deleted");
    }
    public function save(Article $e){
        $this->em->persist($e);
        $this->em->flush();
        return new JsonResponse('Form submitted successfully');
    }
}