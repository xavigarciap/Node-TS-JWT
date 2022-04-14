// Ficheros de prueba
// Otra linea de pruba

import app from './app'
import './database'

app.listen(app.get('port'));
console.log('Server abierto en puerto:', app.get('port'));