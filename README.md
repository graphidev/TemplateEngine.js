# TemplateEngine.js

A light `<template>` tags based template parser

## Features

- Native `<template>` tags based
- Data replacement
- Conditional blocs
- Loop blocs
- Lightweight

## Usage

For fonctional samples, please see the [demonstration file](./demonstration.html.

### The javaScript part

``` js
// 1. Define the destination container
// 2. Define the remplate to use
var container = document.getElementById('view-container'); /* 1 */
var template  = new TemplateEngine( /* 2 */
    document.getElementById('tpl-id')
);

// For each data as necessary, parse the template
data.forEach(function(item) {

    var renderedElement = template.render(item);

    // Then insert the rendered element in the container
    container.appendChild(renderedElement);

});
```

**Note:**
You also may apply some extended treatments such as events attachments.
To prevent any mistakes, remember that `TemplateEngine::render()` method returns a `document-fragment` node.

That why it is highly recommanded to target the conserned elements.

### The HTML part

``` html
<div id="view-container">

    <!-- Rendered template will be inserted here -->

    <template id="tpl-id">
        <div class="item">
            <p>
                This is a template in which you can insert <i>{{somedata}}</i>
            </p>

            <!-- Conditionnal bloc -->
            <template tpl-if="optionaldata">
                <p>This bloc is only parsed be cause <i>optionaldata</i> is available : <i>{{optionaldata}}</i></p>
            </template>

            <!-- Loop bloc -->
            <template tpl-for="loopdata" tpl-key="itemkey" tpl-as="itemvalue" >
                <p>
                    You can loop throught data as well :
                </p>
                <dl>
                    <dt>{{itemkey}}</dt>
                    <dd>{{itemvalue}}</dd>
                </dl>
            </template>
        </div>
    </template>

</div>
```

**Note:**
The _TemplateEngine_ has no depth limit. That means that you can incorporate as blocs (conditional and loop) as you want.

However, each bloc use a new _TemplateEngine_ instance. Even if this library processes may not impact performances, a high depth may impact devices memory.


### The data

``` js
// Define an object based data
var data = [
    {
        somedata: "This is some data",
        optionaldata: "This data can be undefined",
        loopdata: {
            firstitem: "First item value",
            seconditem: "Second item value"
        }
    }
];
```

## Author and Contributing

This quick library is brought to you by [Sébastien ALEXANDRE](https://github.com/graphidev/) as a one shot personnal side project.

Feel free to duplicate, improve and share that library (don't forget to use it sometimes).
Pull requests will be accepted with pleasure !
