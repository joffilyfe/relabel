# Relabel :label:

This project can help you to automate task like change labels on issues or pull requests, update labels names, colors or descriptions.

### CLI

Before you begin able to run this program is necessary to do some steps, please run these commands:

```shell
npm install
npm link
```

After that, you should be able to execute the CLI try out this command
```shell
relabel -h
```

#### Examples

Let's imagine that you're trying to list all opened issues on scieloorg/opac, you can use this command:

```shell
relabel issues list --owner scieloorg --repo opac
```

You should get a output like this:

```shell
# [more log]
#10 - Correção da listagem por instituição na "home" do site. - https://api.github.com/repos/scieloorg/opac/issues/10
#7 - Ajustar o último fascículo na "Home do Periódico" considerando o atributo ``is_public``.  - https://api.github.com/repos/scieloorg/opac/issues/7
```

Let's assume you're trying to list issues on a private repository, the Github API requires an away to authenticate your request. For this purpose, you can use the GitHub [personal access code](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line). Example:

```shell
relabel issues list --owner myuser --repo my_private_repo --token my-private-token
```

###### ~~Thats all folks~~