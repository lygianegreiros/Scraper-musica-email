import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const url = 'https://pt.wikipedia.org/wiki/Lista_das_m%C3%BAsicas_mais_tocadas_no_Spotify#100_m%C3%BAsicas_mais_ouvidas';

async function fetchData() {
    try {
        //requisição da página
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        //pegar a lista correta das músicas
        const tabelaMusicas = $('#mw-content-text .wikitable.sortable > tbody > tr'); // Lista com as músicas
        const musicas = [];

        // Itera sobre as linhas da tabela para pegar as informações
        tabelaMusicas.each(function () {
            const nomeMusicaArtista = $(this).find('td:nth-child(2)').text().trim(); // Nome da música e do artista
            const streamings = $(this).find('td:nth-child(3)').text().trim(); // Quantidade de streamings

            // Log de depuração para verificar o conteúdo
            console.log('Nome da Música e Artista:', nomeMusicaArtista);
            console.log('Streamings:', streamings);

            // Checa se o nome da música e do artista, e os streamings existem
            if (nomeMusicaArtista && streamings) {
                let nomeMusica = nomeMusicaArtista;
                let nomeArtista = '';

                
                const artistaLink = $(this).find('td:nth-child(2) a').attr('title');
                if (artistaLink) {
                    nomeArtista = artistaLink.trim();
                } else {
                    nomeArtista = 'Desconhecido'; // Caso não tenha nome de artista, marca como desconhecido
                }

                // Tentativa de separar o nome da música e do artista
                const separadores = ['–', 'feat.', 'Ft.', 'with'];

                let separado = false;
                for (const separador of separadores) {
                    if (nomeMusicaArtista.includes(separador)) {
                        const partes = nomeMusicaArtista.split(separador).map(item => item.trim());
                        nomeMusica = partes[0];
                        nomeArtista = partes[1] || nomeArtista; // Caso o nome do artista seja vazio
                        separado = true;
                        break;
                    }
                }

                // Se não houve separação, deixei o nome da música como estava
                if (!separado && !nomeArtista) {
                    nomeArtista = 'Desconhecido';
                }

                // Adiciona as informações à lista de músicas
                musicas.push({
                    nomeMusica,
                    nomeArtista,
                    streamings,
                });
            }
        });

        // Exibe as músicas no console
        console.log(musicas);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}


fetchData();
