import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

dotenv.config();


const url = 'https://pt.wikipedia.org/wiki/Lista_das_m%C3%BAsicas_mais_tocadas_no_Spotify#100_m%C3%BAsicas_mais_ouvidas';


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


async function fetchData() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const musicas = [];

 
    $('#mw-content-text .wikitable tbody tr').each((index, element) => {
      const musica = $(element).find('td').eq(1).text().trim(); // Nome da música
      const artista = $(element).find('td').eq(2).text().trim(); // Nome do artista
      const streams = $(element).find('td').eq(3).text().trim(); // Número de streams

      if (musica && artista && streams) {
        musicas.push({ musica, artista, streams });
      }
    });

    return musicas;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

// Função para enviar o e-mail
async function sendEmail(musicas) {
  try {
    const musicasList = musicas.map((musica, index) => {
      return `<p><strong>Rank ${index + 1}:</strong> ${musica.musica} - Artista: ${musica.artista} - Streams: ${musica.streams}</p>`;
    }).join('');

    const info = await transporter.sendMail({
      from: `"Spotify Top Music" <${process.env.EMAIL_USER}>`, // Remetente
      to: 'lygianmonteiro@gmail.com', // Lista de destinatários
      subject: 'Top 100 Músicas Mais Tocadas no Spotify - 2024', // Assunto
      text: 'Conteúdo do e-mail em texto simples', // Corpo do e-mail em texto simples
      html: `
        <h2>As 100 Músicas Mais Tocadas no Spotify - 2024</h2>
        ${musicasList}
      `,
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

// Função principal para buscar os dados e enviar o e-mail
async function main() {
  const musicas = await fetchData();
  if (musicas && musicas.length > 0) {
    await sendEmail(musicas);
  } else {
    console.log('Nenhuma música encontrada.');
  }
}


main();
