const validator = require('validator');

const {
    ServerError
} = require('../errors');
/**
 * 
 * @param {*} field 
 * @throws {ServerError}
 */
const validateFields = (fields) => {

    for (let fieldName in fields) {
        let fieldValue = fields[fieldName].value; 
        const fieldType = fields[fieldName].type;



        if (!fieldValue || fieldValue.length === 0) {
            throw new ServerError(`Lipseste campul ${fieldName}`, 400);
        }


        let categories =  ['casa', 'imobiliare', 'gradina', 'masini', 'moda', 'electronice', 'servicii', 'animale', 'sport'];
        let districts = [
            "Arad", "Timisoara", "Deva", "Harghita", "Covasna", "Arges", "Bucureti", "Ilfov", "Giurgiu", "Dolj", "Bihor", "Ialomita"
          ];



        fieldValue += '';
        switch (fieldType) {
            case 'number':
                if (!validator.isInt(fieldValue, {min: 0})) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie mai mare ca 0`, 400);
                }
                break;

            case 'text':
                break;
            
            case 'bool':
                if (!validator.isBoolean(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa boolean`, 400);
                }
                break;

            case 'name':
                if (!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(fieldValue) ) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa respecte formatul pentru nume`, 400);
                }
                break;

            case 'username':
                if (!/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(fieldValue) ) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa respecte formatul pentru username`, 400);
                }
                break;

            case 'email':
                if (!validator.isEmail(fieldValue) ) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa respecte formatul pentru email`, 400);
                }
                break;

            case 'phone':
                if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(fieldValue) ) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa respecte formatul pentru numar de telefon`, 400);
                }
                break;

            case 'location':
                if(!districts.includes(fieldValue)){
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie un judet valid. Judete: ${districts}`, 400);
                }

                break;

            case 'category':
                if(!categories.includes(fieldValue))
                throw new ServerError(`Campul ${fieldName} trebuie sa fie un judet valid. Categorii: ${categories}`, 400);
                break;

            case 'jwt':
                if (!validator.isJWT(fieldValue)) {
                    throw new ServerError(`Campul ${fieldName} trebuie sa fie jwt`, 400);
                }
                break;
        }
    }
}

module.exports = {
    validateFields
}