module.exports.formulario_inclusao_noticia = function(app, req, res){
    res.render("admin/formulario_de_noticia", { validacao: {}, noticia: {} });
}

module.exports.noticias_salvar = function(app, req, res){
    var noticia = req.body;

    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter de 10 a 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatória').notEmpty().toDate({ format: 'YYYY-MM-DD' });
    req.assert('noticia', 'Notícia é obrigatório').notEmpty();


    var erros = req.validationErrors();
    //console.log(erros);

    if (erros) {
        res.render("admin/formulario_de_noticia", { validacao: erros, noticia: noticia });
        return;
    }


    //Conexão
    var connection = app.config.dbConnection();
    //Model
    var noticiasModel = new app.app.models.NoticiasDAO(connection);
    //Método SalvarNoticia
    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect('/noticias');
    });
}