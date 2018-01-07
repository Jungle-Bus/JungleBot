# JungleBob, the JungleBot Dictionary

As humans, we all communicate using words. Too bad right? Binary would have been so much simpler.
When writing code that is supposed to handle interactions, we need to consider pretty much everything like writing a script for a role-playing game.

We need to imagine how the conversation is going to go, and all the possible outcomes. In the end, once those interactions are defined, we need to find a way to effectively communicate with the user. This goes through language.

Bots are usually a simple sequence of interactions (one statement or question and a specific set of possible answers). Something like :
`
 - A: "Hello, what is your name?"
 - B: X
 - A: "Hello X, nice to meet you. Would you like to hear about the weather?"
 - B: Yes
 etc...
`

People have been struggling for quite some time on making conversations more "natural". In the era of machine learning and smart semantic analysis, we are hoping that soon enough Bots will really be able to have an unique conversation with you.

Right now, we decided to find a smart balance between cold templated sentences and AI.

This is what **JungleBob** is about.

## What it is
**JungleBob** (inspired by *Le Petit Robert*, *Little Robert* which is a famous french Dictionary) is a specification allowing users to declare rich interactions.  
The singularity of JungleBob is that it allows to use **contextual** information and add **diversity** to make more natural conversations with bots.

## Format
JungleBob is specified under the descriptive format YAML. It can also be specified as JSON as both formats are compatible.
In this document, we will focus on the YAML specification.

## Conversation and statements
A conversation is a sequence of interactions between two or more parties.  
When we develop a conversation bot, we need to focus on two things :
 * What we are going to say (our **statements**)
 * What we expect our recipient to answer
Here is a sample scenario of a conversation, for a super interaction in our favorite coffee shop, StarBack.  
![Example of integration workflow](src/dictionary-1-example-interaction-workflow.png)

JungleBob does not specify on what we expect our recipient to answer. JungleBob only focuses on specifying **statements**, which is the sentences we tell our recipient.

JungleBob will be used to declare what will be told to the user in the **starter**, **say_goodbye_cheer_up**, **ask_coffee_sugar**, **ask_coffee_options** and **order_complete** statements.

Therefore, JungleBob will regroup a set of **conversations** which all contain a set of **statements**.

### Conversation

Here is a full example of the valid metadata for a conversation

```yml
name: starback_order
languages:
  - en
  - fr
purpose:
  en: Get all necessary information to prepare the perfect coffee for our contributor.
  fr: Demande toutes les informations nécessaires pour préparer le café idéal pour nos contributeurs.
tags:
  en:
    - coffee
    - coffee shop
    - starback
    - caffeine
  fr:
    - café
    - starback
    - cafféine
    - salon de thé
statements:
  #SEE STATEMENT SECTION
```

Details for each field can be found below

#### language
The list of available languages for the current conversation specified under the format RFC 3066.  
This list is ordered by descending priority. First language is considered as the default entry.

Example:
```yml
languages:
  - en
  - fr
  - de
  - es
  - pt
  - pt-BR
```
In this example, english is the default language (being the first entry)

#### name
One-word key to name your conversation. Must be unique.  
Can use all alphanumeric characters and **-_**

Example:  
```yml
name: starback_order
```

#### purpose
A few words on what the conversation will be about.

**Important** this field must be translated in all the available languages.

Example:
```yml
purpose:
  en: Get all necessary information to prepare the perfect coffee for our contributor.
  fr: Demande toutes les informations nécessaires pour préparer le café idéal pour nos contributeurs.
  de: ...
  es: ...
  pt: ...
  pt_BR: ...
```

#### tags
A list of keywords which can be used to search for your conversation in an eventual search engine.

**Important** this field must be translated in all the available languages. You can have a different number of entries for each language.

```yml
tags:
  en:
    - coffee
    - coffee shop
    - starback
    - caffeine
  fr:
    - café
    - starback
    - cafféine
    - salon de thé
  de:
    - ...
  ...
```

#### statements
The exhaustive set of available statements for the conversation. See the Statement section for more details on the format.

### Statement
