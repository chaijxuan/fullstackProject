//index.js
const app = require('./src/app');
const PORT = 4000;

app.listen(PORT,()=> {
    console.log(`App listening to port ${PORT}`);
});