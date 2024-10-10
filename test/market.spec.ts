import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';

describe('Market', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com/mercado';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Market', () => {
    it('Get all markets', async () => {
      await p.spec().get(`${baseUrl}`).expectStatus(StatusCodes.OK);
    });

    it('Get specific market', async () => {
      await p.spec().get(`${baseUrl}/8`).expectStatus(StatusCodes.OK);
    });

    it('Create a new market', async () => {
      await p
        .spec()
        .post(`${baseUrl}`)
        .withJson({
          nome: faker.company.name(),
          cnpj: faker.string.numeric({ length: 14 }),
          endereco: faker.location.street()
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Get specific product of specific market', async () => {
      await p.spec().get(`${baseUrl}/8/produtos`).expectStatus(StatusCodes.OK);
    });

    it('Get a fruit list of a specific market', async () => {
      await p
        .spec()
        .get(`${baseUrl}/2/produtos/hortifruit/frutas`)
        .expectStatus(StatusCodes.OK);
    });

    it('Create a new fruit of a specific market', async () => {
      await p
        .spec()
        .post(`${baseUrl}/2/produtos/hortifruit/frutas`)
        .withJson({
          nome: faker.food.fruit(),
          valor: faker.number.float()
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Get a candy list of a specific market', async () => {
      await p
        .spec()
        .get(`${baseUrl}/2/produtos/padaria/doces`)
        .expectStatus(StatusCodes.OK);
    });

    it('Get a butchers pigs of a specific market', async () => {
      await p
        .spec()
        .get(`${baseUrl}/2/produtos/acougue/suinos`)
        .expectStatus(StatusCodes.OK);
    });

    it('Create a new butchers pigs of a specific market', async () => {
      await p
        .spec()
        .post(`${baseUrl}/2/produtos/acougue/suinos`)
        .withJson({
          nome: faker.food.meat(),
          valor: faker.number.float()
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Get a butchers bovine of a specific market', async () => {
      await p
        .spec()
        .get(`${baseUrl}/2/produtos/acougue/bovinos`)
        .expectStatus(StatusCodes.OK);
    });

    it('Create a new butchers bovine of a specific market', async () => {
      await p
        .spec()
        .post(`${baseUrl}/2/produtos/acougue/bovinos`)
        .withJson({
          nome: faker.food.meat(),
          valor: faker.number.float()
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Get a lunch list of a specific market', async () => {
      await p
        .spec()
        .get(`${baseUrl}/2/produtos/padaria/salgados`)
        .expectStatus(StatusCodes.OK);
    });
  });
});
