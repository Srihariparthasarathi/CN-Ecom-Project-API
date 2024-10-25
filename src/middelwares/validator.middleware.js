// OM NAMASIVAYA

import { body, validationResult } from "express-validator";

const fileUplodeValidator = async (req, res, next) =>{
    //rules
    const rules =[
        body("productName").trim()
        .exists().withMessage("the product key must be present in the request")
        .notEmpty().withMessage("the product name should not be empty")
        .isLength({ min: 3, max: 50 }).withMessage("The product name must be between 3 and 50 characters long.")
        .matches(/^[a-zA-Z0-9 ]*$/).withMessage("The product name can only contain letters, numbers, and spaces."),
        body("price")
        .exists().withMessage("the price key must be present in the request")
        .notEmpty().withMessage("The price should not be empty.")
        .isNumeric().withMessage("The price must be a valid number.")
        .isFloat({ gt: 0 }).withMessage("The price must be greater than zero."),
        body("description")
        .exists().withMessage("The description key must be present in the request.")
        .optional() 
        .isString().withMessage("The description must be a valid string.")
        .matches(/^[a-zA-Z0-9\s.,;!?]*$/).withMessage("The description can only contain letters, numbers, spaces, and certain punctuation marks."),
        body("image")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Image file is required.");
            }
            return true;
        }),
        body("category")
        .exists().withMessage("the category key must be present in the request")
        .notEmpty().withMessage("the category should not be empty")
        .isLength({min : 3, max : 25}).withMessage("The category must be between 3 and 25 characters long."),
        body("size")
        .optional()
        .isString().withMessage("The size must be a valid string.")
        .custom((value) =>{
            const items = value.split(",").map((item) => item.trim());
            const isValid = items.every((item) =>{
                return !isNaN(item)|| /^[a-zA-Z]+$/.test(item);
            })

            if(!isValid) return new Error("the given size list is not valid")
            return true;
        })
        
    ]

    //run rulse
    await Promise.all(rules.map((rule) => rule.run(req)))

    //errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors : errors.array()})
    }
    next();
}

export{fileUplodeValidator}