import express from 'express';
import { check } from 'express-validator';
import controladorAprendis from '../controllers/Aprendices.js';
import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { aprendicesHelper } from '../helpers/Aprendices.js';
import { fichasHelper } from '../helpers/Fichas.js';

const router = express.Router();

// POST /api/aprendices
router.post('/Insertar', [
    check('cc', 'El campo cc es obligatorio').not().isEmpty(),
    check('cc').custom(aprendicesHelper.existecc),
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').not().isEmpty().isEmail(),
    // check('email').custom(aprendicesHelper.existeEmail),
    check('telefono', 'El campo telefono es obligatorio').not().isEmpty(),
    check('id', 'El campo IdFicha es obligatorio').not().isEmpty(),
    check('id').custom(fichasHelper.existeFichaID),
    validarCampos
], controladorAprendis.crearAprendis);



router.get('/listar', [
  
], controladorAprendis.listarAprendis);


// DELETE /api/aprendices/eliminar/:id
router.delete('/eliminar/:id', [
 
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('id').custom(aprendicesHelper.existeAprendizID),
    validarCampos
], controladorAprendis.eliminarAprendis);

// PUT /api/aprendices/editar/:id
router.put('/editar/:id', [
 
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('cc', 'El campo cc es obligatorio').optional().not().isEmpty(),
    check('cc').custom(aprendicesHelper.existecc),
    check('nombre', 'El campo nombre es obligatorio').optional().not().isEmpty(),
    check('email', 'El campo email es obligatorio').optional().not().isEmpty().isEmail(),
    check('email').custom(aprendicesHelper.existeEmail),
    check('telefono', 'El campo telefono es obligatorio').optional().not().isEmpty(),
    check('IdFicha', 'El campo IdFicha es obligatorio').optional().not().isEmpty(),
    check('IdFicha').custom(fichasHelper.existeFichaID),
    validarCampos
], controladorAprendis.editarAprendis);

export default router;