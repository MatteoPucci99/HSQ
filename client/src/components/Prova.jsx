import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const StyledContainer = styled(Container)`
  flex-direction: column;
  padding: 20px;
  background-color: #257;
  color: #fff;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin: 5px 0;
`;

const StyledImage = styled.img`
  /* Stili per le immagini */
`;

const Footer = () => {
  const nations = [
    "(GB) Cheap flights",
    "(AU) Australia - Cheap flights",
    "(CN) 中国 - 机票",
    "(DK) Flybilletter",
    "(FI) Suomi - lennot",
    "(FR) France - vols",
    "(DE) Deutschland - Flüge",
    "(IN) India - Flight tickets",
    "(IE) Ireland - flights",
    "(IT) Italia - voli",
    "(JP) 日本 - 航空券",
    "(MX) México - vuelos",
    "(NL) Vliegtickets",
    "(NO) Billige flybilletter",
    "(PL) Polska – tanie loty",
    "(RU) Россия - авиабилеты",
    "(ES) España - vuelos",
    "(SE) Sverige - flyg",
    "(CH) Schweiz - Flüge",
    "(TR) Türkiye - uçak biletleri",
    "(AE) United Arab Emirates - flights",
    "(US) USA - flights",
  ];

  const pngFiles = [
    "uk.png",
    "au.png",
    "cn.png",
    "dk.png",
    "fi.png",
    "fr.png",
    "de.png",
    "in.png",
    "ie.png",
    "it.png",
    "jp.png",
    "mx.png",
    "nl.png",
    "no.png",
    "pl.png",
    "ru.png",
    "es.png",
    "se.png",
    "ch.png",
    "tr.png",
    "uae.png",
    "usa.png",
  ];

  return (
    <StyledContainer fluid>
      <div>
        IT·it-IT·€ EUR
        <StyledLink href="#">Help</StyledLink>
        <StyledLink href="#">Impostazioni privacy</StyledLink>
        <StyledLink href="#">Accedi</StyledLink>
        <StyledLink href="#">Informativa sui cookie</StyledLink>
        <StyledLink href="#">Informativa sulla privacy</StyledLink>
        <StyledLink href="#">Termini di servizio</StyledLink>
        <StyledLink href="#">Informazioni sull'azienda</StyledLink>
        Esplora
        <StyledLink href="#">Società</StyledLink>
        <StyledLink href="#">Partner</StyledLink>
        <StyledLink href="#">Viaggi</StyledLink>
      </div>
      <div>
        {nations.map((flight, index) => (
          <div key={index}>
            <StyledImage src={pngFiles[index]} alt={flight} />
            <span>{flight}</span>
          </div>
        ))}
      </div>
    </StyledContainer>
  );
};

export default Footer;