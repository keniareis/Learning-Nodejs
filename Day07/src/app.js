import express, { response } from 'express'
import conexao from '../infra/conexao.js';

const app = express();
app.use(express.json());

app.post('/selecoes', (req, res) => {
    const selecao = req.body;
    const sql =  "INSERT INTO selecoes SET ?;";
    conexao.query(sql, selecao, (error, result) => {
        if(error){
            res.status(400).json({'error': error});
        }else{
            res.status(201).json(result);
        }
    });
});

app.get('/selecoes', (req, res) => {
    const sql = "SELECT * FROM selecoes;";
    conexao.query(sql, (error, result) => {
        if(error){
            res.send(404).json({'error': error});
        }else{
            res.status(200).json(result);
        }
    });
});

app.get('/selecoes/:id', (req, res) => {
    const id =  req.params.id;
    const sql = "SELECT * FROM selecoes WHERE id=?;";
    conexao.query(sql, id, (error, result) => {
        const linha = result[0];
        if(error){
            res.status(404).json({'error': error});
        }else{
            res.status(200).json(linha);
        }
    });
});

app.delete('/selecoes/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM selecoes WHERE id=?";
    conexao.query(sql, id, (error, result) => {
        if(error) {
            res.status(404).json({'error': error});
        }else{
            res.status(200).json(result);
        }
    });
});

app.put('/selecoes/:id', (req, res) => {
    const id = req.params.id;
    const selecao = req.body;
    const sql = "UPDATE selecoes SET ? WHERE id=?;";
    conexao.query(sql, [selecao, id], (error, result) => {
        if(error){
            res.status(400).json({'error': error});
        }else{
            res.status(200).json(result);
        }
    });
});

export default app;
