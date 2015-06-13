![Free-time - Use seu tempo live pra assistir palestras](http://free-time.github.io/assets/image/logo.png)

#Sumário

* [Como enviar uma palestra](#como-enviar-uma-palestra)
* [Contribuidores](#contribuidores)

##Como enviar uma palestra

#### Primeiro passo
Antes de mais nada, [fork o projeto](https://github.com/free-time/free-time.github.io) e baixe seu próprio fork.

#####Requisitos

- [Jekyll](http://jekyllrb.com/docs/installation/)
- [Sass](http://sass-lang.com/install)
- [Imagemagick](http://www.imagemagick.org/script/index.php)

#####Dica

> Usuário do Windows um guia para efetuar a instalação [Run Jekyll on Windows](http://jekyllrb.com/docs/windows/)


#### Segundo passo
Acessem a pasta do projeto localmente e rode o comando <code>./initpost.sh -c Texto da palestra - Nome do palestrante</code>. Em seguida, procure o nome de sua palestra na pasta <code>_posts</code>. Se você é usuário do [Sublime text](http://www.sublimetext.com/3), basta aperta <code>Ctrl + P</code> e digitar o nome da sua palestra, selecionar o arquivo e preencher as informações.

#####Dica
> Lembrando que o arquivo a ser selecionado deve estar em Markdown e não HTML. O arquivo HTML é o compilado, não mexemos nele.

O arquivo a ser preenchido é semelhante a este:
![Exemplo post](http://i.imgur.com/LLzlalU.png)
Antes de preencher a propriedade <code>img</code> verifique se não já tem a foto do palestrante na pasta <code>/assets/image/speakers/</code>.


#### Terceiro passo
Verifique se foi realmente publicada, rode o comando <code>jekyll serve watch</code> e acesse a url, <code>localhost:4000</code>.
Todas publicações estão dentro da paste <code>_posts</code>.

#### Quarto passo

Para otimizar as imagens antes de subir, execute o script:

```
./otimizing-images.sh
```

#### Quinto passo

Depois de tudo feito, só mandar um Pull Request e esperar ser aceito! =)


#####Dicas links uteis
- [Como forkar um projeto no GitHub](https://www.youtube.com/watch?v=BEZu577eQmM)
- [Como criar um PULL REQUEST no Github](https://www.youtube.com/watch?v=E8MPe6tCMo8)



##Contribuidores

[![Anderson Menezes](https://avatars3.githubusercontent.com/u/3930770?v=3&s=80)](https://github.com/andersonweb/) | [![Fernando Daciuk](https://avatars2.githubusercontent.com/u/487669?v=3&s=80)](https://github.com/fdaciuk) | [![Willian Justen](https://avatars2.githubusercontent.com/u/3991845?v=3&s=80)](https://github.com/willianjusten) | [![Alan Mosko](https://avatars2.githubusercontent.com/u/6052272?v=3&s=80)](https://github.com/moskoweb) | [![Lucas Lima](https://avatars2.githubusercontent.com/u/4366755?v=3&s=80)](https://github.com/Lucaslimay)
--- | --- | --- | --- | ---
[Anderson Menezes](https://github.com/andersonweb/) | [Fernando Daciuk](https://github.com/fdaciuk) | [Willian Justen](https://github.com/willianjusten) | [Alan Mosko](https://github.com/moskoweb) | [Lucas Lima](https://github.com/Lucaslimay)