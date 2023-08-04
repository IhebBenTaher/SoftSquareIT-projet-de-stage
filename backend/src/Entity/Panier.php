<?php

namespace App\Entity;

use App\Repository\PanierRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PanierRepository::class)
 */
class Panier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Client::class, inversedBy="panier", cascade={"persist", "remove"})
     */
    private $client;

    /**
     * @ORM\Column(type="json")
     */
    private $liste = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getListe(): ?array
    {
        return $this->liste;
    }

    public function setListe(array $liste): self
    {
        $this->liste = $liste;

        return $this;
    }
}
