export const ValidationErrors = {
  EMAIL_REQUIRED: { code: 'AUTH_001', message: 'O email é obrigatório' },
  EMAIL_INVALID: { code: 'AUTH_002', message: 'Precisa ser um e-mail válido.' },
  PASSWORD_REQUIRED: { code: 'AUTH_003', message: 'A senha é obrigatória' },
  PASSWORD_TOO_SHORT: {
    code: 'AUTH_004',
    message: 'Precisa ter no mínimo 3 caracteres',
  },
  REFRESH_REQUIRED: {
    code: 'AUTH_005',
    message: 'O refreshToken é obrigatório',
  },
  REFRESH_INVALID: { code: 'AUTH_006', message: 'Precisa ser do tipo UUID' },

  TOKEN_REQUIRED: {
    code: 'AUTH_005',
    message: 'O Token é obrigatório',
  },
  TOKEN_INVALID: { code: 'AUTH_006', message: 'Precisa ser do tipo UUID' },

  FIRSTNAME_REQUIRED: { code: 'AUTH_007', message: 'O Nome é obrigatório' },
  FIRSTNAME_INVALID: {
    code: 'AUTH_008',
    message: 'Precisa ter no mínimo 3 caracteres',
  },
  LAST_NAME: { code: 'AUTH_009', message: 'O Sobrenome é obrigatório' },

  NAME_REQUIRED: {
    code: 'PRODUCT_001',
    message: 'O nome do produto é obrigatório.',
  },
  NAME_INVALID: {
    code: 'PRODUCT_002',
    message: 'O nome do produto deve ser uma string.',
  },

  PRICE_REQUIRED: {
    code: 'PRODUCT_003',
    message: 'O preço do produto é obrigatório.',
  },
  PRICE_INVALID: {
    code: 'PRODUCT_004',
    message: 'O preço deve ser um número válido.',
  },

  DESCRIPTION_REQUIRED: {
    code: 'PRODUCT_005',
    message: 'A descrição é obrigatória.',
  },
  DESCRIPTION_INVALID: {
    code: 'PRODUCT_006',
    message: 'A descrição deve ser uma string.',
  },

  LONG_DESCRIPTION_INVALID: {
    code: 'PRODUCT_007',
    message: 'A descrição longa deve ser um array de strings.',
  },
  IMAGE_URLS_INVALID: {
    code: 'PRODUCT_008',
    message: 'As URLs das imagens devem ser um array de strings.',
  },

  RATING_INVALID: {
    code: 'PRODUCT_009',
    message: 'A avaliação deve ser um número com no máximo 1 casa decimal.',
  },
  REVIEW_COUNT_INVALID: {
    code: 'PRODUCT_010',
    message: 'A quantidade de avaliações deve ser um número.',
  },

  FEATURES_INVALID: {
    code: 'PRODUCT_011',
    message: 'As características devem ser um array de strings.',
  },
  IS_AVAILABLE_INVALID: {
    code: 'PRODUCT_012',
    message: 'O campo de disponibilidade deve ser booleano.',
  },
  FREE_SHIPPING_INVALID: {
    code: 'PRODUCT_013',
    message: 'O campo de frete grátis deve ser booleano.',
  },
  SHIPPING_ESTIMATE_INVALID: {
    code: 'PRODUCT_014',
    message: 'O prazo de envio deve ser uma string.',
  },

  ID_REQUIRED: {
    code: 'PRODUCT_015',
    message: 'O ID do produto é obrigatório.',
  },
  ID_INVALID: {
    code: 'PRODUCT_016',
    message: 'O ID do produto deve ser um UUID válido.',
  },
};
