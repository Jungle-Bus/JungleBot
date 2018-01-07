# JungleBob, the JungleBot Dictionary

Current version: `1.0`

Full samples available in the [samples directory](samples/)

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

# What it is
**JungleBob** (inspired by *Le Petit Robert*, *Little Robert* which is a famous french Dictionary) is a specification allowing users to declare rich interactions.  
The singularity of JungleBob is that it allows to use **contextual** information and add **diversity** to make more natural conversations with bots.

# Format
JungleBob is specified under the descriptive format YAML. It can also be specified as JSON as both formats are compatible.
In this document, we will focus on the YAML specification.

# Conversation and statements
A conversation is a sequence of interactions between two or more parties.  
When we develop a conversation bot, we need to focus on two things :
 * What we are going to say (our **statements**)
 * What we expect our recipient to answer
Here is a sample scenario of a conversation, for a super interaction in our favorite coffee shop, StarBack.  
![Example of integration workflow](src/dictionary-1-example-interaction-workflow.png)

JungleBob does not specify on what we expect our recipient to answer. JungleBob only focuses on specifying **statements**, which is the sentences we tell our recipient.

JungleBob will be used to declare what will be told to the user in the **starter**, **say_goodbye_cheer_up**, **ask_coffee_sugar**, **ask_coffee_options** and **order_complete** statements.

Therefore, JungleBob will regroup a set of **conversations** which all contain a set of **statements**.

## Conversation

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


### name
------
One-word key to name your conversation. Must be unique.  
Can use all alphanumeric characters and **-_**

Example:  
```yml
name: starback_order
```

### language
------
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

### purpose
------
A few words on what the conversation will be about.

**Important:** this field must be translated in all the available languages.

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

### tags
------
A list of keywords which can be used to search for your conversation in an eventual search engine.

**Important:** this field must be translated in all the available languages. You can have a different number of entries for each language.

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

### statements
------
The exhaustive set of available statements for the conversation. See the Statement section for more details on the format.

## Statement
A statement is exactly what it means: a message you are passing to someone else in a conversation.

Exactly like in reality, your message can be passed so many different ways. To salute someone, we could say either "Hi", or "Hello", or "Good morning".

To have richer interactions, we thought it would be important to provide the ability to declare different forms the same message. We call each form a **variation**.

Further more, it makes no sense for anyone to say **Good Morning** at 7 PM. Some variations are **contextual**, and therefore need to be explicitly associated with contextual elements.

Here is a valid full example of a statement identified by the key **starter**:  
```yml
  starter:
    generic:
      - fr: "Bonjour {name}, j'espère que tout va bien aujourd'hui."
        en: "Hello {name}, I hope you are feeling great today."
      - fr: "Tiens, je pensais justement à toi!"
        en: "Ohh, I was just thinking about you!"
    contextual:
      - fr: "Salut {name}, ça va ce matin?"
        en: "Hey {name}, how is it going this morning?"
        context:
          anyOf:
            - morning
      - fr: "Quel beau temps {name}, l'occasion parfaite d'aller se balader"
        en: "What a nice weather {name}, perfect to go for a ride"
        context:
          allOf:
            - day
            - sunny
```

Details for each field can be found below


### key
------
One-word key to identify your statement. Must be unique.  
Can use all alphanumeric characters and **-_**
This statement is an object key inside the parent statements object.

Example:  
```yml
statements:
  starter:
    #Place statement content here
```

### generic
------
Generic entries are a list of variations without contextual data.
This means each generic can be used anytime under any circumstances in the conversation.

Needless to say that every statement must have **at least one** generic variation.

A generic variation is a set of Key/Value sentences, where the key is the locale (one for each of the available languages) and the value is the statement itself.

Example:  
```yml
generic:
  - fr: "Bonjour {name}, j'espère que tout va bien aujourd'hui."
    en: "Hello {name}, I hope you are feeling great today."
  - fr: "Bonjour très cher."
    en: "Hello dear."
  - fr: "Tiens, je pensais justement à toi!"
    en: "Ohh, I was just thinking about you!"
```

**Important:** this field must be translated in all the available languages.

### contextual
------
This is where the fun begins. You and I always add context to the way we communicate. Whether it is late at night, sunny, whether we are tired or happy, whether my recipient is a man or a woman, etc...

We felt like JungleBob should reflect this contextual information. The principle is quite trivial. All **variations** declared in the contextual area of a statement will have to contain at least one contextual tag. Tags will be determined by the software that implements the specification, and are therefore free to implement any tag they want.

Still, we felt that providing a basic list of most-common contextual tags would allow implementors to have reusable specs.
Feel free to add an issue if you are thinking of other contextual tags.

**Common Contextual tags:**
 * Time of day: `morning`, `afternoon`, `evening`, `day`, `night`
 * Weather: `sunny`, `cloudy`, `rainy`, `snowy`
 * Temperature: `hot`, `mild`, `cold`
 * Recipient Gender: `male`, `female`
 * Season: `spring`, `summer`, `autumn`, `winter`
 * Recipient participation: `not-active`, `not-very-active`, `active`, `very-active`

**Important:** what those tags mean and how they are triggered is left to the appreciation of the implementations.

**Conditions:**
A variation can only be chosen when it matches one of its tags.
However, we also needed to make more complex cases to allow any kind of combinations.
For instance, the variation "Such a beautiful winter evening. And look at your window! It's snow!" would require both `winter`, `evening` and `snowy` tags to be working.
But if we change it to "Such a beautiful winter day. And look at your window! It's snow!", now it would still require `winter` and `snow`, but any of `morning`, `afternoon` and `day` would be fine.

For that reason, the tags of any contextual variation must be added either in a **notIn**, **anyOf** or **allOf** list.
Variations can have tags in different lists, although a single tag can only be in one list.

Example:  
```yml
contextual:
  - fr: "Bonjour {name}, j'espère que tout va bien en cette belle matinée ensoleillée."
    en: "Good morning {name}, I hope you are feeling great in this sunny day."
    context:
      allOf:
        - morning
        - sunny
  - fr: "J'aime les belles saisons!"
    en: "I like warm seasons!"
    context:
      anyOf:
        - spring
        - summer
  - fr: "La pluie, c'est terminé, on va pouvoir sortir ce soir"
    en: "No more rain! Let's go out tonight!"
    context:
      notIn:
        - rain
      anyOf:
        - evening
        - afternoon
```
