# Contribuições

### Por onde começar?

**1.** Faça o _fork_ do projeto.

**2.** [Entenda nosso fluxo](#fluxo).

### Fluxo

É muito fácil contribuir para o projeto. Qualquer tipo de ajuda (seja ela grande ou pequena) é bem-vinda. Se encontrar qualquer parte do projeto que possa ser melhorada, essa é uma grande oportunidade para participar ([aqui](https://github.com/free-time/free-time.github.io/issues) é um ótimo lugar para achar coisas que possam ser melhoradas). Caso não saiba por onde começar:

**1.** Faça referência ao repositório oficial após o _fork_

```
git remote add upstream git@github.com:free-time/free-time.github.io.git
```

**2.** Antes de iniciar o processo de contribuição, crie uma nova branch para fazer suas alterações.

Alguns exemplos:

- Para Novas tarefas: `git checkout -b nomeDaTarefa`
- Para erros: `git checkout -b nomeDoErro`

> Use qualquer nome que seja coerente com a contribuição que está sendo feita.

**3.** Após realizar as alterações, é hora de fazer um commit com uma mensagem em inglês coerente do que foi feito. Exemplo:

```
git add --all
git commit -am ‘Adding a new task’
git push origin nomeDaTarefa
```
> Todos as mensagens dos commits devem ser escritas em inglês.

**4.** Envie um _Pull Request_ com as alterações feitas, fazendo referência para o `master` do repositório oficial.

**5.** Sua contribuição será analisada pela comunidade. Em alguns casos pediremos algumas alterações antes de dar merge.

Após o merge:

- Delete a branch utilizada:

```
git checkout master
git push origin nomeDaTarefa
git branch -D nomeDaTarefa
```

- Atualize seu repositório com o repositório oficial:

```
git fetch upstream
git rebase upstream/master
git push -f origin master
```
