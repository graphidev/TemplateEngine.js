/**
 *
 * TemplateEngine.js
 * ===
 *
 * This library provide a <template> tags based templating parser.
 *
**/
(function(window, document) {

    /**
     * Instanciate template object
     * ---
     * @param   string      id        Template id
    **/
    function TemplateEngine(templateElement) {

        if (!(this instanceof TemplateEngine)) {
            return new TemplateEngine(id);
        }

        this.templateElement = (templateElement ? templateElement : false);
    }

    /**
     * Render template
     * ---
     * @param   object              data        Initial data that would be used all along
     * @return  DocumentFragment    Returns the parsed template within a DocumentFragment
    **/
    TemplateEngine.prototype.render = function(data, string) {

        var currentTemplate = this.templateElement.cloneNode(true);

        /**
         * Render `if` templates blocs
         * ---
         * @note These blocs used the parent data level
        **/
        var ifTpls = currentTemplate.content.querySelectorAll('template[tpl-if]:nth-child(n), :not(template) template[tpl-if]');
        [].forEach.call(ifTpls, function(ifTpl) {

            var targetAttr   = ifTpl.getAttribute('tpl-if');
            var subTplParent = ifTpl.parentNode;

            if(data[targetAttr]) {

                var subTpl = new TemplateEngine(ifTpl);
                var renderedSubTpl = subTpl.render(data);

                subTplParent.insertBefore(renderedSubTpl, ifTpl);

            }

            // Remove the `if` template
            subTplParent.removeChild(ifTpl);

        });

        /**
         * Render `for` templates blocs
         * ---
         * @note These blocs used the locally defined data merged within
         *       the parent data level.
        **/
        var forTpls = currentTemplate.content.querySelectorAll('template[tpl-for][tpl-as]:nth-child(n), :not(template) template[tpl-for][tpl-as]');
        [].forEach.call(forTpls, function(forTpl) {

            var targetSource = forTpl.getAttribute('tpl-for');
            var targetAttr   = forTpl.getAttribute('tpl-as');

            var subTplParent = forTpl.parentNode

            if(data[targetSource]) {

                var subTpl = new TemplateEngine(forTpl);

                for(key in data[targetSource]) {

                    var loopValName  = forTpl.getAttribute('tpl-as');
                    var loopValKey   = forTpl.getAttribute('tpl-key');

                    var subData = [];
                    if(loopValKey) {
                        subData[loopValKey] = key;
                    }
                    subData[loopValName] = data[targetSource][key];

                    var subTplData = Object.assign(data, subData);

                    var renderedSubTpl = subTpl.render(subTplData);
                    subTplParent.insertBefore(renderedSubTpl, forTpl);
                }

            }

            // Remove the `for` template
            subTplParent.removeChild(forTpl);

        });


        /**
         * Render data within the first-level template
         * ---
         * @syntax {{dataKey}}
        **/
        for(key in data) {

            var value = data[key];
            if(typeof value != 'string' && typeof value != 'number') {
                continue;
            }

            currentTemplate.innerHTML = currentTemplate.innerHTML.replace('{{'+key+'}}', value);

        }

        /* That's it ! */
        return document.importNode(currentTemplate.content, true);

    };

    window.TemplateEngine = TemplateEngine;

})(window, document);
