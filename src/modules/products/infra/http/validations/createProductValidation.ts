import { body } from 'express-validator';
import { ValidationErrors } from '@shared/core/errors/messages';
import { validate } from 'main/http/middlewares/handleValidationErrors';

export const createProductValidation = [
  body('name')
    .notEmpty()
    .withMessage(ValidationErrors.NAME_REQUIRED)
    .isString()
    .withMessage(ValidationErrors.NAME_INVALID),

  body('price')
    .notEmpty()
    .withMessage(ValidationErrors.PRICE_REQUIRED)
    .isNumeric()
    .withMessage(ValidationErrors.PRICE_INVALID),

  body('description')
    .notEmpty()
    .withMessage(ValidationErrors.DESCRIPTION_REQUIRED)
    .isString()
    .withMessage(ValidationErrors.DESCRIPTION_INVALID),

  body('long_description')
    .optional()
    .isArray()
    .withMessage(ValidationErrors.LONG_DESCRIPTION_INVALID)
    .custom((arr) => arr.every((val: any) => typeof val === 'string'))
    .withMessage(ValidationErrors.LONG_DESCRIPTION_INVALID),

  body('image_urls')
    .optional()
    .isArray()
    .withMessage(ValidationErrors.IMAGE_URLS_INVALID)
    .custom((arr) => arr.every((val: any) => typeof val === 'string'))
    .withMessage(ValidationErrors.IMAGE_URLS_INVALID),

  body('rating')
    .optional()
    .isFloat({ max: 5 })
    .withMessage(ValidationErrors.RATING_INVALID),

  body('reviewCount')
    .optional()
    .isNumeric()
    .withMessage(ValidationErrors.REVIEW_COUNT_INVALID),

  body('features')
    .optional()
    .isArray()
    .withMessage(ValidationErrors.FEATURES_INVALID)
    .custom((arr) => arr.every((val: any) => typeof val === 'string'))
    .withMessage(ValidationErrors.FEATURES_INVALID),

  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage(ValidationErrors.IS_AVAILABLE_INVALID),

  body('freeShipping')
    .optional()
    .isBoolean()
    .withMessage(ValidationErrors.FREE_SHIPPING_INVALID),

  body('shippingEstimate')
    .optional()
    .isString()
    .withMessage(ValidationErrors.SHIPPING_ESTIMATE_INVALID),

  validate,
];
