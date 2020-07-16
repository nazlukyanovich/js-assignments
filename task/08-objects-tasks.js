'use strict'; 


/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    Rectangle.prototype.getArea = function(width, height) {
        return this.width * this.height;
    }
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    string: '',

    element: function(value) {
        let cssObject1 = Object.create(cssSelectorBuilder);
        cssObject1.string = `${this.string}${value}`;
        cssObject1.propID = 1;
        this.checkCorrect(cssObject1.propID);
        return cssObject1;
    },

    id: function(value) {
        let cssObject2 = Object.create(cssSelectorBuilder);
        cssObject2.string = `${this.string}#${value}`;
        cssObject2.propID = 2;
        this.checkCorrect(cssObject2.propID);
        return cssObject2;
    },

    class: function(value) {
        let cssObject3 = Object.create(cssSelectorBuilder);
        cssObject3.string = `${this.string}.${value}`;
        cssObject3.propID = 3;
        this.checkCorrect(cssObject3.propID);
        return cssObject3;
    },

    attr: function(value) {
        let cssObject4 = Object.create(cssSelectorBuilder);
        cssObject4.string = `${this.string}[${value}]`;
        cssObject4.propID = 4;
        this.checkCorrect(cssObject4.propID);
        return cssObject4;
    },

    pseudoClass: function(value) {
        let cssObject5 = Object.create(cssSelectorBuilder);
        cssObject5.string = `${this.string}:${value}`;
        cssObject5.propID = 5;
        this.checkCorrect(cssObject5.propID);
        return cssObject5;
    },

    pseudoElement: function(value) {
        let cssObject6 = Object.create(cssSelectorBuilder);
        cssObject6.string = `${this.string}::${value}`;
        cssObject6.propID = 6;
        this.checkCorrect(cssObject6.propID);
        return cssObject6;
    },

    combine: function(selector1, combinator, selector2) {
        let cssObject7 = Object.create(cssSelectorBuilder);
        cssObject7.string = `${selector1.string} ${combinator} ${selector2.string}`;
        return cssObject7;
    },

    stringify() {
        return this.string;
    },

    checkCorrect(x) {
        this.checkUnique(x);
        this.checkOrder(x);
    },
    checkUnique(x) {
        /* let arr = [1, 2, 6];
        Array.includes = function() {
            let [first, ...rest] = arguments;
            return Array.prototype.includes.apply(first, rest);
        }*/
        if (this.propID === x && (x === 1 || x === 2 || x === 6)) {
            throw new Error ('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
    },
    checkOrder(x) {
        if (this.propID > x) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
