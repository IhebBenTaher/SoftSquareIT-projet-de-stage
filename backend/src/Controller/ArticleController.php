<?php

namespace App\Controller;

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
use App\Services\ArticleService;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/article")
 */
class ArticleController extends AbstractController
{
    private $as;
    public function __construct(ArticleService $as)
    {
        $this->as = $as;
    }

    /**
     * @Route("/", name="app_article_index", methods={"GET"})
     */
    public function index(): Response
    {
        // $articles=$articleRepository->findAll();
        // $data = $serializer->serialize($articles, 'json', [
        //     'circular_reference_handler' => function ($object) {
        //         return $object->getId();
        //     },
        //     'include_metadata' => true,
        //     'attributes' => [
        //         'id',
        //         'name',
        //         'description',
        //         'price',
        //         'categorie' => [
        //             'name'
        //         ],
        //         'images' => [
        //             'file'
        //         ]
        //     ]
        // ]);
        // return new JsonResponse($data, 200, [], true);
        return $this->as->getArticles();
        // foreach($articleRepository->findAll() as $e){
        //     $articles[]=array(
        //         "id"=>$e->getId(),
        //         "name"=>$e->getName(),
        //         "description"=>$e->getDescription(),
        //         "price"=>$e->getPrice(),
        //         "categorie"=>$e->getCategorie()
        //     );
        // }
        // return new JsonResponse($articles);
    }

    /**
     * @Route("/image", name="app_article_image", methods={"POST"})
     */
    public function addimage(CategorieRepository $cr, Request $req, EntityManagerInterface $em): Response
    {
        $nb = count($req->files->all());
        for ($i=0;$i<$nb;$i++) {
            $file = $req->files->get('file'.$i);
            $filename=$file->getClientOriginalName();
            $file->move($this->getParameter('uploads'),$filename);
        }
        return $this->json(['message' => 'Form submitted successfully']);
    }

    public function removeimage(string $images)
    {
        $result = explode(',', $images);
        $filesystem = new Filesystem();
        foreach ($result as $value) {
            $filesystem->remove($this->getParameter('uploads').$value);
        }
    }

    /**
     * @Route("/new", name="app_article_new", methods={"POST"})
     */
    public function new(Request $req): Response
    {   
        // $data=json_decode($req->getContent(),true);
        // $article = new Article();
        // $form=$this->createForm(ArticleType::class,$article,array('csrf_protection'=>false));
        // $form->submit($data);
        // $this->save($em,$article);
        // return $this->json(['message' => 'Form submitted successfully']);
        $article = new Article();
        return $this->save($article,$req);
        // $categorieName = $req->request->get('categorie');
        // //$files = $req->files->get('images');
        // $article = new Article();
        // $article->setName($req->request->get('name'));
        // $article->setDescription($req->request->get('description'));
        // $article->setPrice($req->request->get('price'));
        // $category = $cr->findOneBy(["name"=>$categorieName]);
        // $article->setCategorie($category);
        // $em->persist($article);
        // $em->flush();
        // $i=$req->request->get('number');
        // for ($j=0;$j<$i;$j++) {
        //     $file = $req->files->get('images'.$j);
        //     $image = new Image();
        //     $filename=md5(uniqid()).".".$file->guessClientExtension();
        //     $file->move($this->getParameter('uploads'),$filename);
        //     $image->setFile($filename);
        //     $image->setArticle($article);
        //     $em->persist($image);
        //     $em->flush();
        // }
        // return new Response("article created successfully ".$i);
    }
    public function save(Article $article,Request $req){
        $data=json_decode($req->getContent(),true);
        $delim = $data['del'];
        if($delim!=""){$this->removeimage($delim);}
        $form=$this->createForm(ArticleType::class,$article,array('csrf_protection'=>false));
        $form->submit($data);
        return $this->as->save($article);
    }

    /**
     * @Route("/{id}", name="app_article_show", methods={"GET"})
     */
    public function show($id): Response
    {
        return $this->as->getArticle($id);
    }

    /**
     * @Route("/{id}/edit", name="app_article_edit", methods={"GET", "PUT"})
     */
    public function edit(Article $article,Request $req): Response
    {
        // $data=json_decode($req->getContent(),true);
        // $form=$this->createForm(ArticleType::class,$article,array('csrf_protection'=>false));
        // $form->submit($data);
        // $this->save($em,$article);
        // return $this->json(['message' => 'Form submitted successfully']);
        return $this->save($article,$req);
        // $categorieName = $req->request->get('categorie');
        // $e=$ar->findOneBy(["id"=>$id]);
        // $e->setName($req->request->get('name'));
        // $e->setDescription($req->request->get('description'));
        // $e->setPrice($req->request->get('price'));
        // $category = $cr->findOneBy(["name"=>$categorieName]);
        // $e->setCategorie($category);
        // //$e->setImage($req->get("image"));
        // $em->persist($e);
        // $em->flush();
        // return new Response("article modified successfully");
    }

    /**
     * @Route("/{id}", name="app_article_delete", methods={"DELETE"})
     */
    public function delete(Article $a): Response
    {
        $this->removeimage($a->getImages().",".$a->getImage());
        return $this->as->deleteArticle($a);
    }
}
