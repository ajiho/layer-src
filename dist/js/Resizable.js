/*!
 * layer-src v1.0.0 (undefined)
 * Copyright 2023-2024 
 * license MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('events')) :
	typeof define === 'function' && define.amd ? define(['events'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Resizable = factory(global.require$$10));
})(this, (function (require$$10) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	/** Just a fake element to test styles
	 * @module mucss/fake-element
	 */

	var fakeElement;
	var hasRequiredFakeElement;

	function requireFakeElement () {
		if (hasRequiredFakeElement) return fakeElement;
		hasRequiredFakeElement = 1;
		fakeElement = document.createElement('div');
		return fakeElement;
	}

	var prefix = {exports: {}};

	/**
	 * Vendor prefixes
	 * Method of http://davidwalsh.name/vendor-prefix
	 * @module mucss/prefix
	 */

	var hasRequiredPrefix;

	function requirePrefix () {
		if (hasRequiredPrefix) return prefix.exports;
		hasRequiredPrefix = 1;
		var styles = getComputedStyle(document.documentElement, '');

		if (!styles) {
			prefix.exports = {
				dom: '', lowercase: '', css: '', js: ''
			};
		}

		else {
			var pre = (Array.prototype.slice.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1];

			var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

			prefix.exports = {
				dom: dom,
				lowercase: pre,
				css: '-' + pre + '-',
				js: pre[0].toUpperCase() + pre.substr(1)
			};
		}
		return prefix.exports;
	}

	/**
	 * Get or set element’s style, prefix-agnostic.
	 *
	 * @module  mucss/css
	 */

	var css;
	var hasRequiredCss;

	function requireCss () {
		if (hasRequiredCss) return css;
		hasRequiredCss = 1;
		var fakeStyle = requireFakeElement().style;
		var prefix = requirePrefix().lowercase;


		/**
		 * Apply styles to an element.
		 *
		 * @param    {Element}   el   An element to apply styles.
		 * @param    {Object|string}   obj   Set of style rules or string to get style rule.
		 */
		css = function(el, obj){
			if (!el || !obj) return;

			var name, value;

			//return value, if string passed
			if (typeof obj === 'string') {
				name = obj;

				//return value, if no value passed
				if (arguments.length < 3) {
					return el.style[prefixize(name)];
				}

				//set style, if value passed
				value = arguments[2] || '';
				obj = {};
				obj[name] = value;
			}

			for (name in obj){
				//convert numbers to px
				if (typeof obj[name] === 'number' && /left|right|bottom|top|width|height/i.test(name)) obj[name] += 'px';

				value = obj[name] || '';

				el.style[prefixize(name)] = value;
			}
		};


		/**
		 * Return prefixized prop name, if needed.
		 *
		 * @param    {string}   name   A property name.
		 * @return   {string}   Prefixed property name.
		 */
		function prefixize(name){
			var uName = name[0].toUpperCase() + name.slice(1);
			if (fakeStyle[name] !== undefined) return name;
			if (fakeStyle[prefix + uName] !== undefined) return prefix + uName;
			return '';
		}
		return css;
	}

	/**
	 * Returns parsed css value.
	 *
	 * @module mucss/parse-value
	 *
	 * @param {string} str A string containing css units value
	 *
	 * @return {number} Parsed number value
	 */

	var parseValue;
	var hasRequiredParseValue;

	function requireParseValue () {
		if (hasRequiredParseValue) return parseValue;
		hasRequiredParseValue = 1;
		parseValue = function (str){
			str += '';
			return parseFloat(str.slice(0,-2)) || 0;
		};

		//FIXME: add parsing units
		return parseValue;
	}

	var selection = {};

	/**
	 * Enable/disable selectability of an element
	 * @module mucss/selection
	 */

	var hasRequiredSelection;

	function requireSelection () {
		if (hasRequiredSelection) return selection;
		hasRequiredSelection = 1;
		var css = requireCss();


		/**
		 * Disable or Enable any selection possibilities for an element.
		 *
		 * @param    {Element}   el   Target to make unselectable.
		 */
		selection.disable = function(el){
			css(el, {
				'user-select': 'none',
				'user-drag': 'none',
				'touch-callout': 'none'
			});
			el.setAttribute('unselectable', 'on');
			el.addEventListener('selectstart', pd);
		};
		selection.enable = function(el){
			css(el, {
				'user-select': null,
				'user-drag': null,
				'touch-callout': null
			});
			el.removeAttribute('unselectable');
			el.removeEventListener('selectstart', pd);
		};


		/** Prevent you know what. */
		function pd(e){
			e.preventDefault();
		}
		return selection;
	}

	/**
	 * Simple rect constructor.
	 * It is just faster and smaller than constructing an object.
	 *
	 * @module mucss/rect
	 *
	 * @param {number} l left
	 * @param {number} t top
	 * @param {number} r right
	 * @param {number} b bottom
	 *
	 * @return {Rect} A rectangle object
	 */

	var rect;
	var hasRequiredRect;

	function requireRect () {
		if (hasRequiredRect) return rect;
		hasRequiredRect = 1;
		rect = function Rect (l,t,r,b) {
			if (!(this instanceof Rect)) return new Rect(l,t,r,b);

			this.left=l||0;
			this.top=t||0;
			this.right=r||0;
			this.bottom=b||0;
			this.width=Math.abs(this.right - this.left);
			this.height=Math.abs(this.bottom - this.top);
		};
		return rect;
	}

	var hasScroll = {};

	/**
	 * Window scrollbar detector.
	 *
	 * @module mucss/has-scroll
	 */

	var hasRequiredHasScroll;

	function requireHasScroll () {
		if (hasRequiredHasScroll) return hasScroll;
		hasRequiredHasScroll = 1;
		//TODO: detect any element scroll, not only the window
		hasScroll.x = function () {
			return window.innerHeight > document.documentElement.clientHeight;
		};
		hasScroll.y = function () {
			return window.innerWidth > document.documentElement.clientWidth;
		};
		return hasScroll;
	}

	/**
	 * Calculate scrollbar width.
	 *
	 * @module mucss/scrollbar
	 */

	var scrollbar;
	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbar;
		hasRequiredScrollbar = 1;
		// Create the measurement node
		var scrollDiv = document.createElement("div");

		var style = scrollDiv.style;

		style.width = '100px';
		style.height = '100px';
		style.overflow = 'scroll';
		style.position = 'absolute';
		style.top = '-9999px';

		document.documentElement.appendChild(scrollDiv);

		// the scrollbar width
		scrollbar = scrollDiv.offsetWidth - scrollDiv.clientWidth;

		// Delete fake DIV
		document.documentElement.removeChild(scrollDiv);
		return scrollbar;
	}

	/**
	 * Detect whether element is placed to fixed container or is fixed itself.
	 *
	 * @module mucss/is-fixed
	 *
	 * @param {(Element|Object)} el Element to detect fixedness.
	 *
	 * @return {boolean} Whether element is nested.
	 */

	var isFixed;
	var hasRequiredIsFixed;

	function requireIsFixed () {
		if (hasRequiredIsFixed) return isFixed;
		hasRequiredIsFixed = 1;
		isFixed = function (el) {
			var parentEl = el;

			//window is fixed, btw
			if (el === window) return true;

			//unlike the doc
			if (el === document) return false;

			while (parentEl) {
				if (getComputedStyle(parentEl).position === 'fixed') return true;
				parentEl = parentEl.offsetParent;
			}
			return false;
		};
		return isFixed;
	}

	/**
	 * Parse translate3d
	 *
	 * @module mucss/translate
	 */

	var translate;
	var hasRequiredTranslate;

	function requireTranslate () {
		if (hasRequiredTranslate) return translate;
		hasRequiredTranslate = 1;
		var css = requireCss();
		var parseValue = requireParseValue();

		translate = function (el) {
			var translateStr = css(el, 'transform');

			//find translate token, retrieve comma-enclosed values
			//translate3d(1px, 2px, 2) → 1px, 2px, 2
			//FIXME: handle nested calcs
			var match = /translate(?:3d)?\s*\(([^\)]*)\)/.exec(translateStr);

			if (!match) return [0, 0];
			var values = match[1].split(/\s*,\s*/);

			//parse values
			//FIXME: nested values are not necessarily pixels
			return values.map(function (value) {
				return parseValue(value);
			});
		};
		return translate;
	}

	/**
	 * Calculate absolute offsets of an element, relative to the document.
	 *
	 * @module mucss/offsets
	 *
	 */

	var offset;
	var hasRequiredOffset;

	function requireOffset () {
		if (hasRequiredOffset) return offset;
		hasRequiredOffset = 1;
		var win = window;
		var doc = document;
		var Rect = requireRect();
		var hasScroll = requireHasScroll();
		var scrollbar = requireScrollbar();
		var isFixedEl = requireIsFixed();
		requireTranslate();


		/**
		 * Return absolute offsets of any target passed
		 *
		 * @param    {Element|window}   el   A target. Pass window to calculate viewport offsets
		 * @return   {Object}   Offsets object with trbl.
		 */
		offset = offsets;

		function offsets (el) {
			if (!el) throw Error('Bad argument');

			//calc client rect
			var cRect, result;

			//return vp offsets
			if (el === win) {
				result = Rect(
					win.pageXOffset,
					win.pageYOffset
				);

				result.width = win.innerWidth - (hasScroll.y() ? scrollbar : 0),
				result.height = win.innerHeight - (hasScroll.x() ? scrollbar : 0);
				result.right = result.left + result.width;
				result.bottom = result.top + result.height;

				return result;
			}

			//return absolute offsets if document requested
			else if (el === doc) {
				var res = offsets(doc.documentElement);
				res.bottom = Math.max(window.innerHeight, res.bottom);
				res.right = Math.max(window.innerWidth, res.right);
				res.height = Math.max(window.innerHeight, res.height);
				res.width = Math.max(window.innerHeight, res.width);
				if (hasScroll.y(doc.documentElement)) res.right -= scrollbar;
				if (hasScroll.x(doc.documentElement)) res.bottom -= scrollbar;
				return res;
			}

			//FIXME: why not every element has getBoundingClientRect method?
			try {
				cRect = el.getBoundingClientRect();
			} catch (e) {
				cRect = Rect(
					el.clientLeft,
					el.clientTop
				);
			}

			//whether element is or is in fixed
			var isFixed = isFixedEl(el);
			var xOffset = isFixed ? 0 : win.pageXOffset;
			var yOffset = isFixed ? 0 : win.pageYOffset;

			result = Rect(
				cRect.left + xOffset,
				cRect.top + yOffset,
				cRect.left + xOffset + el.offsetWidth,
				cRect.top + yOffset + el.offsetHeight
			);

			return result;
		}	return offset;
	}

	var circlePoint;
	var hasRequiredCirclePoint;

	function requireCirclePoint () {
		if (hasRequiredCirclePoint) return circlePoint;
		hasRequiredCirclePoint = 1;

		/**
		 * circle-point collision
		 * @param {number} x1 center of circle
		 * @param {number} y1 center of circle
		 * @param {radius} r1 radius of circle
		 * @param {number} x2 point
		 * @param {number} y2 point
		 * @return {boolean}
		 */
		circlePoint = function circlePoint(x1, y1, r1, x2, y2)
		{
		    var x = x2 - x1;
		    var y = y2 - y1;
		    return x * x + y * y <= r1 * r1
		};
		return circlePoint;
	}

	var circleCircle;
	var hasRequiredCircleCircle;

	function requireCircleCircle () {
		if (hasRequiredCircleCircle) return circleCircle;
		hasRequiredCircleCircle = 1;


		/**
		 * circle-circle collision
		 * @param {number} x1 center of circle 1
		 * @param {number} y1 center of circle 1
		 * @param {number} r1 radius of circle 1
		 * @param {number} x2 center of circle 2
		 * @param {number} y2 center of circle 2
		 * @param {number} r2 radius of circle 2
		 * @return {boolean}
		 */
		circleCircle = function circleCircle(x1, y1, r1, x2, y2, r2)
		{
		    var x = x1 - x2;
		    var y = y2 - y1;
		    var radii = r1 + r2;
		    return x * x + y * y <= radii * radii
		};
		return circleCircle;
	}

	var lineCircle;
	var hasRequiredLineCircle;

	function requireLineCircle () {
		if (hasRequiredLineCircle) return lineCircle;
		hasRequiredLineCircle = 1;

		/**
		 * line-circle collision
		 number @param {number} x1 point 1 of line
		 number @param {number} y1 point 1 of line
		 number @param {number} x2 point 2 of line
		 number @param {number} y2 point 2 of line
		 number @param {number} xc center of circle
		 number @param {number} yc center of circle
		 number @param {number} rc radius of circle
		 */
		lineCircle = function lineCircle(x1, y1, x2, y2, xc, yc, rc)
		{
		    var ac = [xc - x1, yc - y1];
		    var ab = [x2 - x1, y2 - y1];
		    var ab2 = dot(ab, ab);
		    var acab = dot(ac, ab);
		    var t = acab / ab2;
		    t = (t < 0) ? 0 : t;
		    t = (t > 1) ? 1 : t;
		    var h = [(ab[0] * t + x1) - xc, (ab[1] * t + y1) - yc];
		    var h2 = dot(h, h);
		    return h2 <= rc * rc
		};

		function dot(v1, v2)
		{
		    return (v1[0] * v2[0]) + (v1[1] * v2[1])
		}
		return lineCircle;
	}

	var circleLine;
	var hasRequiredCircleLine;

	function requireCircleLine () {
		if (hasRequiredCircleLine) return circleLine;
		hasRequiredCircleLine = 1;

		var lineCircle = requireLineCircle();

		/**
		 * circle-line collision
		 * from http://stackoverflow.com/a/10392860/1955997
		 * @param {number} xc center of circle
		 * @param {number} yc center of circle
		 * @param {radius} rc radius of circle
		 * @param {number} x1 first point of line
		 * @param {number} y1 first point of line
		 * @param {number} x2 second point of line
		 * @param {number} y2 second point of line
		 * @return {boolean}
		 */
		circleLine = function circleLine(xc, yc, rc, x1, y1, x2, y2)
		{
		    return lineCircle(x1, y1, x2, y2, xc, yc, rc)
		};
		return circleLine;
	}

	var boxCircle;
	var hasRequiredBoxCircle;

	function requireBoxCircle () {
		if (hasRequiredBoxCircle) return boxCircle;
		hasRequiredBoxCircle = 1;

		/**
		 * box-circle collision
		 * @param {number} xb top-left corner of box
		 * @param {number} yb top-left corner of box
		 * @param {number} wb width of box
		 * @param {number} hb height of box
		 * @param {number} xc center of circle
		 * @param {number} yc center of circle
		 * @param {number} rc radius of circle
		 */
		boxCircle = function boxCircle(xb, yb, wb, hb, xc, yc, rc)
		{
		    var hw = wb / 2;
		    var hh = hb / 2;
		    var distX = Math.abs(xc - (xb + wb / 2));
		    var distY = Math.abs(yc - (yb + hb / 2));

		    if (distX > hw + rc || distY > hh + rc)
		    {
		        return false
		    }

		    if (distX <= hw || distY <= hh)
		    {
		        return true
		    }

		    var x = distX - hw;
		    var y = distY - hh;
		    return x * x + y * y <= rc * rc
		};
		return boxCircle;
	}

	var circleBox;
	var hasRequiredCircleBox;

	function requireCircleBox () {
		if (hasRequiredCircleBox) return circleBox;
		hasRequiredCircleBox = 1;

		var boxCircle = requireBoxCircle();

		/**
		 * circle-box (axis-oriented rectangle) collision
		 * from http://stackoverflow.com/a/402010/1955997
		 * @param {number} xc center of circle
		 * @param {number} yc center of circle
		 * @param {radius} rc radius of circle
		 * @param {number} xb top-left corner of rectangle
		 * @param {number} yb top-left corner of rectangle
		 * @param {number} wb width of rectangle
		 * @param {number} hb height of rectangle
		 */
		circleBox = function circleBox(xc, yc, rc, xb, yb, wb, hb)
		{
		    return boxCircle(xb, yb, wb, hb, xc, yc, rc)
		};
		return circleBox;
	}

	var polygonPoint;
	var hasRequiredPolygonPoint;

	function requirePolygonPoint () {
		if (hasRequiredPolygonPoint) return polygonPoint;
		hasRequiredPolygonPoint = 1;

		/**
		 * polygon-point collision
		 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
		 * @param {number} x of point
		 * @param {number} y of point
		 */
		polygonPoint = function polygonPoint(points, x, y)
		{
		    var length = points.length;
		    var c = false;
		    for (var i = 0, j = length - 2; i < length; i += 2)
		    {
		        if (((points[i + 1] > y) !== (points[j + 1] > y)) && (x < (points[j] - points[i]) * (y - points[i + 1]) / (points[j + 1] - points[i + 1]) + points[i]))
		        {
		            c = !c;
		        }
		        j = i;
		    }
		    return c
		};
		return polygonPoint;
	}

	var polygonCircle;
	var hasRequiredPolygonCircle;

	function requirePolygonCircle () {
		if (hasRequiredPolygonCircle) return polygonCircle;
		hasRequiredPolygonCircle = 1;

		var polygonPoint = requirePolygonPoint();
		var lineCircle = requireLineCircle();


		/**
		 * polygon-circle collision
		 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
		 * @param {number} xc center of circle
		 * @param {number} yc center of circle
		 * @param {number} rc radius of circle
		 */
		polygonCircle = function polygonCircle(points, xc, yc, rc)
		{
		    if (polygonPoint(points, xc, yc))
		    {
		        return true
		    }
		    var count = points.length;
		    for (var i = 0; i < count - 2; i += 2)
		    {
		        if (lineCircle(points[i], points[i + 1], points[i + 2], points[i + 3], xc, yc, rc))
		        {
		            return true
		        }
		    }
		    return lineCircle(points[0], points[1], points[count - 2], points[count - 1], xc, yc, rc)
		};
		return polygonCircle;
	}

	var circlePolygon;
	var hasRequiredCirclePolygon;

	function requireCirclePolygon () {
		if (hasRequiredCirclePolygon) return circlePolygon;
		hasRequiredCirclePolygon = 1;

		var polygonCircle = requirePolygonCircle();

		/**
		 * circle-polygon collision
		 * from http://stackoverflow.com/a/402019/1955997
		 * @param {number} xc center of circle
		 * @param {number} yc center of circle
		 * @param {radius} rc radius of circle
		 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
		 */
		circlePolygon = function circlePolygon(xc, yc, rc, points)
		{
		    return polygonCircle(points, xc, yc, rc)
		};
		return circlePolygon;
	}

	var lineLine;
	var hasRequiredLineLine;

	function requireLineLine () {
		if (hasRequiredLineLine) return lineLine;
		hasRequiredLineLine = 1;

		/**
		 * line-line collision
		 * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
		 * @param {number} x1 first point in line 1
		 * @param {number} y1 first point in line 1
		 * @param {number} x2 second point in line 1
		 * @param {number} y2 second point in line 1
		 * @param {number} x3 first point in line 2
		 * @param {number} y3 first point in line 2
		 * @param {number} x4 second point in line 2
		 * @param {number} y4 second point in line 2
		 * @return {boolean}
		 */
		lineLine = function lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
		{
		    var s1_x = x2 - x1;
		    var s1_y = y2 - y1;
		    var s2_x = x4 - x3;
		    var s2_y = y4 - y3;
		    var s = (-s1_y * (x1 - x3) + s1_x * (y1 - y3)) / (-s2_x * s1_y + s1_x * s2_y);
		    var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y);
		    return s >= 0 && s <= 1 && t >= 0 && t <= 1
		};
		return lineLine;
	}

	var linePolygon;
	var hasRequiredLinePolygon;

	function requireLinePolygon () {
		if (hasRequiredLinePolygon) return linePolygon;
		hasRequiredLinePolygon = 1;

		var polygonPoint = requirePolygonPoint();
		var lineLine = requireLineLine();

		/**
		 * line-polygon collision
		 number @param {number} x1 point 1 of line
		 number @param {number} y1 point 1 of line
		 number @param {number} x2 point 2 of line
		 number @param {number} y2 point 2 of line
		 number @param {number[]} points of polygon
		 */
		linePolygon = function linePolygon(x1, y1, x2, y2, points)
		{
		    var length = points.length;

		    // check if first point is inside the shape (this covers if the line is completely enclosed by the shape)
		    if (polygonPoint(points, x1, y1))
		    {
		        return true
		    }

		    // check for intersections for all of the sides
		    for (var i = 0; i < length; i += 2)
		    {
		        var j = (i + 2) % length;
		        if (lineLine(x1, y1, x2, y2, points[i], points[i + 1], points[j], points[j + 1]))
		        {
		            return true
		        }
		    }
		    return false
		};
		return linePolygon;
	}

	var polygonLine;
	var hasRequiredPolygonLine;

	function requirePolygonLine () {
		if (hasRequiredPolygonLine) return polygonLine;
		hasRequiredPolygonLine = 1;

		var linePolygon = requireLinePolygon();

		/**
		 * polygon-line collisions
		 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
		 * @param {number} x1 first point in line
		 * @param {number} y1 first point in line
		 * @param {number} x2 second point in line
		 * @param {number} y2 second point in line
		 * @return {boolean}
		 */
		polygonLine = function polygonLine(points, x1, y1, x2, y2)
		{
		    return linePolygon(x1, y1, x2, y2, points)
		};
		return polygonLine;
	}

	var polygonPolygon;
	var hasRequiredPolygonPolygon;

	function requirePolygonPolygon () {
		if (hasRequiredPolygonPolygon) return polygonPolygon;
		hasRequiredPolygonPolygon = 1;

		/**
		 * polygon-polygon collision
		 * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
		 * @param {number[]} points1 [x1, y1, x2, y2, ... xn, yn] of first polygon
		 * @param {number[]} points2 [x1, y1, x2, y2, ... xn, yn] of second polygon
		 * @return {boolean}
		 */
		polygonPolygon = function polygonPolygon(points1, points2)
		{
		    var a = points1;
		    var b = points2;
		    var polygons = [a, b];
		    var minA, maxA, projected, minB, maxB, j;
		    for (var i = 0; i < polygons.length; i++)
		    {
		        var polygon = polygons[i];
		        for (var i1 = 0; i1 < polygon.length; i1 += 2)
		        {
		            var i2 = (i1 + 2) % polygon.length;
		            var normal = { x: polygon[i2 + 1] - polygon[i1 + 1], y: polygon[i1] - polygon[i2] };
		            minA = maxA = null;
		            for (j = 0; j < a.length; j += 2)
		            {
		                projected = normal.x * a[j] + normal.y * a[j + 1];
		                if (minA === null || projected < minA)
		                {
		                    minA = projected;
		                }
		                if (maxA === null || projected > maxA)
		                {
		                    maxA = projected;
		                }
		            }
		            minB = maxB = null;
		            for (j = 0; j < b.length; j += 2)
		            {
		                projected = normal.x * b[j] + normal.y * b[j + 1];
		                if (minB === null || projected < minB)
		                {
		                    minB = projected;
		                }
		                if (maxB === null || projected > maxB)
		                {
		                    maxB = projected;
		                }
		            }
		            if (maxA < minB || maxB < minA)
		            {
		                return false
		            }
		        }
		    }
		    return true
		};
		return polygonPolygon;
	}

	var polygonBox;
	var hasRequiredPolygonBox;

	function requirePolygonBox () {
		if (hasRequiredPolygonBox) return polygonBox;
		hasRequiredPolygonBox = 1;

		var polygonPolygon = requirePolygonPolygon();

		/**
		 * polygon-box collision
		 * @param {number[]} points [x1, y1, x2, y2, ... xn, yn] of polygon
		 * @param {number} x of box
		 * @param {number} y of box
		 * @param {number} w of box
		 * @param {number} h of box
		 */
		polygonBox = function polygonBox(points, x, y, w, h)
		{
		    var points2 = [x, y, x + w, y, x + w, y + h, x, y + h];
		    return polygonPolygon(points, points2)
		};
		return polygonBox;
	}

	var boxPoint;
	var hasRequiredBoxPoint;

	function requireBoxPoint () {
		if (hasRequiredBoxPoint) return boxPoint;
		hasRequiredBoxPoint = 1;

		/**
		 * box-point collision
		 * @param {number} x1 top-left corner of box
		 * @param {number} y1 top-left corner of box
		 * @param {number} w1 width of box
		 * @param {number} h1 height of box
		 * @param {number} x2 of point
		 * @param {number} y2 of point
		 * @return {boolean}
		 */
		boxPoint = function boxPoint(x1, y1, w1, h1, x2, y2)
		{
		    return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1
		};
		return boxPoint;
	}

	var boxBox;
	var hasRequiredBoxBox;

	function requireBoxBox () {
		if (hasRequiredBoxBox) return boxBox;
		hasRequiredBoxBox = 1;

		/**
		 * box-box collision
		 * @param {number} x1 top-left corner of first box
		 * @param {number} y1 top-left corner of first box
		 * @param {number} w1 width of first box
		 * @param {number} h1 height of first box
		 * @param {number} x2 top-left corner of second box
		 * @param {number} y2 top-left corner of second box
		 * @param {number} w2 width of second box
		 * @param {number} h2 height of second box
		 */
		boxBox = function boxBox(x1, y1, w1, h1, x2, y2, w2, h2)
		{
		    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
		};
		return boxBox;
	}

	var lineBox;
	var hasRequiredLineBox;

	function requireLineBox () {
		if (hasRequiredLineBox) return lineBox;
		hasRequiredLineBox = 1;

		var boxPoint = requireBoxPoint();
		var lineLine = requireLineLine();

		/**
		 * line-box collision
		 number @param {number} x1 point 1 of line
		 number @param {number} y1 point 1 of line
		 number @param {number} x2 point 2 of line
		 number @param {number} y2 point 2 of line
		 number @param {number} xb top-left of box
		 number @param {number} yb top-left of box
		 number @param {number} wb width of box
		 number @param {number} hb height of box
		 */
		lineBox = function lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
		{
		    if (boxPoint(xb, yb, wb, hb, x1, y1) || boxPoint(xb, yb, wb, hb, x2, y2))
		    {
		        return true
		    }
		    return lineLine(x1, y1, x2, y2, xb, yb, xb + wb, yb) ||
		        lineLine(x1, y1, x2, y2, xb + wb, yb, xb + wb, yb + hb) ||
		        lineLine(x1, y1, x2, y2, xb, yb + hb, xb + wb, yb + hb) ||
		        lineLine(x1, y1, x2, y2, xb, yb, xb, yb + hb)
		};
		return lineBox;
	}

	var boxLine;
	var hasRequiredBoxLine;

	function requireBoxLine () {
		if (hasRequiredBoxLine) return boxLine;
		hasRequiredBoxLine = 1;

		var lineBox = requireLineBox();

		/**
		 * box-line collision
		 * @param {number} xb top-left corner of box
		 * @param {number} yb top-left corner of box
		 * @param {number} wb width of box
		 * @param {number} hb height of box
		 * @param {number} x1 first point of line
		 * @param {number} y1 first point of line
		 * @param {number} x2 second point of line
		 * @param {number} y2 second point of line
		 */
		boxLine = function boxLine(xb, yb, wb, hb, x1, y1, x2, y2)
		{
		    return lineBox(x1, y1, x2, y2, xb, yb, wb, hb)
		};
		return boxLine;
	}

	var boxPolygon;
	var hasRequiredBoxPolygon;

	function requireBoxPolygon () {
		if (hasRequiredBoxPolygon) return boxPolygon;
		hasRequiredBoxPolygon = 1;

		var polygonBox = requirePolygonBox();

		/**
		 * box-polygon collision
		 * @param {number} xb top-left corner of box
		 * @param {number} yb top-left corner of box
		 * @param {number} wb width of box
		 * @param {number} hb height of box
		 * @param {number[]} points of polygon
		 */
		boxPolygon = function boxPolygon(xb, yb, wb, hb, points)
		{
		    return polygonBox(points, xb, yb, wb, hb)
		};
		return boxPolygon;
	}

	var pointBox;
	var hasRequiredPointBox;

	function requirePointBox () {
		if (hasRequiredPointBox) return pointBox;
		hasRequiredPointBox = 1;

		var boxPoint = requireBoxPoint();

		/**
		 * point-box collision
		 * @param {number} x1 point
		 * @param {number} y1 point
		 * @param {number} xb top-left corner of box
		 * @param {number} yb top-left corner of box
		 * @param {number} wb width of box
		 * @param {number} hb height of box
		 * @return {boolean}
		 */
		pointBox = function pointBox(x1, y1, xb, yb, wb, hb)
		{
		    return boxPoint(xb, yb, wb, hb, x1, y1)
		};
		return pointBox;
	}

	var pointPolygon;
	var hasRequiredPointPolygon;

	function requirePointPolygon () {
		if (hasRequiredPointPolygon) return pointPolygon;
		hasRequiredPointPolygon = 1;

		var polygonPoint = requirePolygonPoint();

		/**
		 * point-polygon collision
		 * @param {number} x1
		 * @param {number} y1
		 * @param {number[]} points
		 * @return {boolean}
		 */
		pointPolygon = function pointPolygon(x1, y1, points)
		{
		    return polygonPoint(points, x1, y1)
		};
		return pointPolygon;
	}

	var pointCircle;
	var hasRequiredPointCircle;

	function requirePointCircle () {
		if (hasRequiredPointCircle) return pointCircle;
		hasRequiredPointCircle = 1;

		var circlePoint = requireCirclePoint();

		pointCircle = function pointCircle(x1, y1, xc, yc, rc)
		{
		    return circlePoint(xc, yc, rc, x1, y1)
		};
		return pointCircle;
	}

	var intersects;
	var hasRequiredIntersects;

	function requireIntersects () {
		if (hasRequiredIntersects) return intersects;
		hasRequiredIntersects = 1;

		intersects = {
		    circlePoint: requireCirclePoint(),
		    circleCircle: requireCircleCircle(),
		    circleLine: requireCircleLine(),
		    circleBox: requireCircleBox(),
		    circlePolygon: requireCirclePolygon(),

		    polygonPoint: requirePolygonPoint(),
		    polygonLine: requirePolygonLine(),
		    polygonPolygon: requirePolygonPolygon(),
		    polygonBox: requirePolygonBox(),
		    polygonCircle: requirePolygonCircle(),

		    boxPoint: requireBoxPoint(),
		    boxBox: requireBoxBox(),
		    boxLine: requireBoxLine(),
		    boxPolygon: requireBoxPolygon(),
		    boxCircle: requireBoxCircle(),

		    pointBox: requirePointBox(),
		    pointPolygon: requirePointPolygon(),
		    pointCircle: requirePointCircle(),

		    lineLine: requireLineLine(),
		    lineBox: requireLineBox(),
		    linePolygon: requireLinePolygon(),
		    lineCircle: requireLineCircle()
		};
		return intersects;
	}

	/**
	 * @module Icicle
	 */

	var icicle;
	var hasRequiredIcicle;

	function requireIcicle () {
		if (hasRequiredIcicle) return icicle;
		hasRequiredIcicle = 1;
		icicle = {
			freeze: lock,
			unfreeze: unlock,
			isFrozen: isLocked
		};


		/** Set of targets  */
		var lockCache = new WeakMap;


		/**
		 * Set flag on target with the name passed
		 *
		 * @return {bool} Whether lock succeeded
		 */
		function lock(target, name){
			var locks = lockCache.get(target);
			if (locks && locks[name]) return false;

			//create lock set for a target, if none
			if (!locks) {
				locks = {};
				lockCache.set(target, locks);
			}

			//set a new lock
			locks[name] = true;

			//return success
			return true;
		}


		/**
		 * Unset flag on the target with the name passed.
		 *
		 * Note that if to return new value from the lock/unlock,
		 * then unlock will always return false and lock will always return true,
		 * which is useless for the user, though maybe intuitive.
		 *
		 * @param {*} target Any object
		 * @param {string} name A flag name
		 *
		 * @return {bool} Whether unlock failed.
		 */
		function unlock(target, name){
			var locks = lockCache.get(target);
			if (!locks || !locks[name]) return false;

			locks[name] = null;

			return true;
		}


		/**
		 * Return whether flag is set
		 *
		 * @param {*} target Any object to associate lock with
		 * @param {string} name A flag name
		 *
		 * @return {Boolean} Whether locked or not
		 */
		function isLocked(target, name){
			var locks = lockCache.get(target);
			return (locks && locks[name]);
		}
		return icicle;
	}

	/**
	 * A storage of per-target callbacks.
	 * WeakMap is the most safe solution.
	 *
	 * @module emmy/listeners
	 */

	var listeners_1;
	var hasRequiredListeners;

	function requireListeners () {
		if (hasRequiredListeners) return listeners_1;
		hasRequiredListeners = 1;
		/**
		 * Property name to provide on targets.
		 *
		 * Can’t use global WeakMap -
		 * it is impossible to provide singleton global cache of callbacks for targets
		 * not polluting global scope. So it is better to pollute target scope than the global.
		 *
		 * Otherwise, each emmy instance will create it’s own cache, which leads to mess.
		 *
		 * Also can’t use `._events` property on targets, as it is done in `events` module,
		 * because it is incompatible. Emmy targets universal events wrapper, not the native implementation.
		 *
		 */
		//FIXME: new npm forces flat modules structure, so weakmaps are better providing that there’s the one emmy across the project.
		var cbPropName = '_callbacks';


		/**
		 * Get listeners for the target/evt (optionally).
		 *
		 * @param {object} target a target object
		 * @param {string}? evt an evt name, if undefined - return object with events
		 *
		 * @return {(object|array)} List/set of listeners
		 */
		function listeners(target, evt, tags){
			var cbs = target[cbPropName];
			var result;

			if (!evt) {
				result = cbs || {};

				//filter cbs by tags
				if (tags) {
					var filteredResult = {};
					for (var evt in result) {
						filteredResult[evt] = result[evt].filter(function (cb) {
							return hasTags(cb, tags);
						});
					}
					result = filteredResult;
				}

				return result;
			}

			if (!cbs || !cbs[evt]) {
				return [];
			}

			result = cbs[evt];

			//if there are evt namespaces specified - filter callbacks
			if (tags && tags.length) {
				result = result.filter(function (cb) {
					return hasTags(cb, tags);
				});
			}

			return result;
		}


		/**
		 * Remove listener, if any
		 */
		listeners.remove = function(target, evt, cb, tags){
			//get callbacks for the evt
			var evtCallbacks = target[cbPropName];
			if (!evtCallbacks || !evtCallbacks[evt]) return false;

			var callbacks = evtCallbacks[evt];

			//if tags are passed - make sure callback has some tags before removing
			if (tags && tags.length && !hasTags(cb, tags)) return false;

			//remove specific handler
			for (var i = 0; i < callbacks.length; i++) {
				//once method has original callback in .cb
				if (callbacks[i] === cb || callbacks[i].fn === cb) {
					callbacks.splice(i, 1);
					break;
				}
			}
		};


		/**
		 * Add a new listener
		 */
		listeners.add = function(target, evt, cb, tags){
			if (!cb) return;

			var targetCallbacks = target[cbPropName];

			//ensure set of callbacks for the target exists
			if (!targetCallbacks) {
				targetCallbacks = {};
				Object.defineProperty(target, cbPropName, {
					value: targetCallbacks
				});
			}

			//save a new callback
			(targetCallbacks[evt] = targetCallbacks[evt] || []).push(cb);

			//save ns for a callback, if any
			if (tags && tags.length) {
				cb._ns = tags;
			}
		};


		/** Detect whether an cb has at least one tag from the list */
		function hasTags(cb, tags){
			if (cb._ns) {
				//if cb is tagged with a ns and includes one of the ns passed - keep it
				for (var i = tags.length; i--;){
					if (cb._ns.indexOf(tags[i]) >= 0) return true;
				}
			}
		}


		listeners_1 = listeners;
		return listeners_1;
	}

	var isPlainObj;
	var hasRequiredIsPlainObj;

	function requireIsPlainObj () {
		if (hasRequiredIsPlainObj) return isPlainObj;
		hasRequiredIsPlainObj = 1;
		var toString = Object.prototype.toString;

		isPlainObj = function (x) {
			var prototype;
			return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
		};
		return isPlainObj;
	}

	/**
	 * @module emmy/on
	 */

	var on_1;
	var hasRequiredOn;

	function requireOn () {
		if (hasRequiredOn) return on_1;
		hasRequiredOn = 1;
		var icicle = requireIcicle();
		var listeners = requireListeners();
		var isObject = requireIsPlainObj();

		on_1 = on;


		/**
		 * Bind fn to a target.
		 *
		 * @param {*} targte A single target to bind evt
		 * @param {string} evt An event name
		 * @param {Function} fn A callback
		 * @param {Function}? condition An optional filtering fn for a callback
		 *                              which accepts an event and returns callback
		 *
		 * @return {object} A target
		 */
		function on(target, evt, fn){
			if (!target) return target;

			//consider object of events
			if (isObject(evt)) {
				for(var evtName in evt) {
					on(target, evtName, evt[evtName]);
				}
				return target;
			}

			//get target `on` method, if any
			//prefer native-like method name
			//user may occasionally expose `on` to the global, in case of browserify
			//but it is unlikely one would replace native `addEventListener`
			var onMethod =  target['addEventListener'] || target['addListener'] || target['attachEvent'] || target['on'];

			var cb = fn;

			evt = '' + evt;

			//invoke method for each space-separated event from a list
			evt.split(/\s+/).forEach(function(evt){
				var evtParts = evt.split('.');
				evt = evtParts.shift();

				//use target event system, if possible
				if (onMethod) {
					//avoid self-recursions
					//if it’s frozen - ignore call
					if (icicle.freeze(target, 'on' + evt)){
						onMethod.call(target, evt, cb);
						icicle.unfreeze(target, 'on' + evt);
					}
					else {
						return target;
					}
				}

				//save the callback anyway
				listeners.add(target, evt, cb, evtParts);
			});

			return target;
		}


		/**
		 * Wrap an fn with condition passing
		 */
		on.wrap = function(target, evt, fn, condition){
			var cb = function() {
				if (condition.apply(target, arguments)) {
					return fn.apply(target, arguments);
				}
			};

			cb.fn = fn;

			return cb;
		};
		return on_1;
	}

	var sliced;
	var hasRequiredSliced;

	function requireSliced () {
		if (hasRequiredSliced) return sliced;
		hasRequiredSliced = 1;
		/**
		 * An Array.prototype.slice.call(arguments) alternative
		 *
		 * @param {Object} args something with a length
		 * @param {Number} slice
		 * @param {Number} sliceEnd
		 * @api public
		 */

		sliced = function (args, slice, sliceEnd) {
		  var ret = [];
		  var len = args.length;

		  if (0 === len) return ret;

		  var start = slice < 0
		    ? Math.max(0, slice + len)
		    : slice || 0;

		  if (sliceEnd !== undefined) {
		    len = sliceEnd < 0
		      ? sliceEnd + len
		      : sliceEnd;
		  }

		  while (len-- > start) {
		    ret[len - start] = args[len];
		  }

		  return ret;
		};
		return sliced;
	}

	/**
	 * @module emmy/off
	 */

	var off_1;
	var hasRequiredOff;

	function requireOff () {
		if (hasRequiredOff) return off_1;
		hasRequiredOff = 1;
		off_1 = off;

		var icicle = requireIcicle();
		var slice = requireSliced();
		var listeners = requireListeners();


		/**
		 * Remove listener[s] from the target
		 *
		 * @param {[type]} evt [description]
		 * @param {Function} fn [description]
		 *
		 * @return {[type]} [description]
		 */
		function off(target, evt, fn) {
			if (!target) return target;

			var callbacks;

			//unbind all listeners if no fn specified
			if (fn === undefined) {
				var args = slice(arguments, 1);

				//try to use target removeAll method, if any
				var allOff = target['removeAll'] || target['removeAllListeners'];

				//call target removeAll
				if (allOff) {
					allOff.apply(target, args);
				}


				//then forget own callbacks, if any

				//unbind all evts
				if (!evt) {
					callbacks = listeners(target);
					for (evt in callbacks) {
						off(target, evt);
					}
				}
				//unbind all callbacks for an evt
				else {
					evt = '' + evt;

					//invoke method for each space-separated event from a list
					evt.split(/\s+/).forEach(function (evt) {
						var evtParts = evt.split('.');
						evt = evtParts.shift();
						callbacks = listeners(target, evt, evtParts);

						//returned array of callbacks (as event is defined)
						if (evt) {
							var obj = {};
							obj[evt] = callbacks;
							callbacks = obj;
						}

						//for each group of callbacks - unbind all
						for (var evtName in callbacks) {
							slice(callbacks[evtName]).forEach(function (cb) {
								off(target, evtName, cb);
							});
						}
					});
				}

				return target;
			}


			//target events (string notation to advanced_optimizations)
			var offMethod = target['removeEventListener'] || target['removeListener'] || target['detachEvent'] || target['off'];

			//invoke method for each space-separated event from a list
			evt.split(/\s+/).forEach(function (evt) {
				var evtParts = evt.split('.');
				evt = evtParts.shift();

				//use target `off`, if possible
				if (offMethod) {
					//avoid self-recursion from the outside
					if (icicle.freeze(target, 'off' + evt)) {
						offMethod.call(target, evt, fn);
						icicle.unfreeze(target, 'off' + evt);
					}

					//if it’s frozen - ignore call
					else {
						return target;
					}
				}

				if (fn.closedCall) fn.closedCall = false;

				//forget callback
				listeners.remove(target, evt, fn, evtParts);
			});


			return target;
		}
		return off_1;
	}

	var server;
	var hasRequiredServer;

	function requireServer () {
		if (hasRequiredServer) return server;
		hasRequiredServer = 1;
		server = false;
		return server;
	}

	/**
	 * @module emmy/emit
	 */

	var emit_1;
	var hasRequiredEmit;

	function requireEmit () {
		if (hasRequiredEmit) return emit_1;
		hasRequiredEmit = 1;
		var icicle = requireIcicle();
		var slice = requireSliced();
		var listeners = requireListeners();
		var isBrowser = requireServer();


		/**
		 * A simple wrapper to handle stringy/plain events
		 */
		emit_1 = function(target, evt){
			if (!target) return;

			var args = arguments;
			if (typeof evt === 'string') {
				args = slice(arguments, 2);
				evt.split(/\s+/).forEach(function(evt){
					evt = evt.split('.')[0];

					emit.apply(this, [target, evt].concat(args));
				});
			} else {
				return emit.apply(this, args);
			}
		};


		/** detect env */
		var $ = typeof jQuery === 'undefined' ? undefined : jQuery;
		var doc = typeof document === 'undefined' ? undefined : document;
		var win = typeof window === 'undefined' ? undefined : window;


		/**
		 * Emit an event, optionally with data or bubbling
		 * Accept only single elements/events
		 *
		 * @param {string} eventName An event name, e. g. 'click'
		 * @param {*} data Any data to pass to event.details (DOM) or event.data (elsewhere)
		 * @param {bool} bubbles Whether to trigger bubbling event (DOM)
		 *
		 *
		 * @return {target} a target
		 */
		function emit(target, eventName, data, bubbles){
			var emitMethod, evt = eventName;

			//Create proper event for DOM objects
			if (isBrowser && (target instanceof Node || target === win)) {
				//NOTE: this doesnot bubble on off-DOM elements

				if (isBrowser && eventName instanceof Event) {
					evt = eventName;
				} else {
					//IE9-compliant constructor
					evt = doc.createEvent('CustomEvent');
					evt.initCustomEvent(eventName, bubbles, true, data);

					//a modern constructor would be:
					// var evt = new CustomEvent(eventName, { detail: data, bubbles: bubbles })
				}

				emitMethod = target.dispatchEvent;
			}

			//create event for jQuery object
			else if ($ && target instanceof $) {
				//TODO: decide how to pass data
				evt = $.Event( eventName, data );
				evt.detail = data;

				//FIXME: reference case where triggerHandler needed (something with multiple calls)
				emitMethod = bubbles ? targte.trigger : target.triggerHandler;
			}

			//detect target events
			else {
				//emit - default
				//trigger - jquery
				//dispatchEvent - DOM
				//raise - node-state
				//fire - ???
				emitMethod = target['dispatchEvent'] || target['emit'] || target['trigger'] || target['fire'] || target['raise'];
			}


			var args = slice(arguments, 2);


			//use locks to avoid self-recursion on objects wrapping this method
			if (emitMethod) {
				if (icicle.freeze(target, 'emit' + eventName)) {
					//use target event system, if possible
					emitMethod.apply(target, [evt].concat(args));
					icicle.unfreeze(target, 'emit' + eventName);

					return target;
				}

				//if event was frozen - probably it is emitter instance
				//so perform normal callback
			}


			//fall back to default event system
			var evtCallbacks = listeners(target, evt);

			//copy callbacks to fire because list can be changed by some callback (like `off`)
			var fireList = slice(evtCallbacks);
			for (var i = 0; i < fireList.length; i++ ) {
				fireList[i] && fireList[i].apply(target, args);
			}

			return target;
		}
		return emit_1;
	}

	/**
	 * Get clientY/clientY from an event.
	 * If index is passed, treat it as index of global touches, not the targetTouches.
	 * Global touches include target touches.
	 *
	 * @module get-client-xy
	 *
	 * @param {Event} e Event raised, like mousemove
	 *
	 * @return {number} Coordinate relative to the screen
	 */

	var getClientXy;
	var hasRequiredGetClientXy;

	function requireGetClientXy () {
		if (hasRequiredGetClientXy) return getClientXy;
		hasRequiredGetClientXy = 1;
		function getClientY (e, idx) {
			// touch event
			if (e.touches) {
				if (arguments.length > 1) {
					return findTouch(e.touches, idx).clientY
				}
				else {
					return e.targetTouches[0].clientY;
				}
			}

			// mouse event
			return e.clientY;
		}
		function getClientX (e, idx) {
			// touch event
			if (e.touches) {
				if (arguments.length > idx) {
					return findTouch(e.touches, idx).clientX;
				}
				else {
					return e.targetTouches[0].clientX;
				}
			}

			// mouse event
			return e.clientX;
		}

		function getClientXY (e, idx) {
			return [getClientX.apply(this, arguments), getClientY.apply(this, arguments)];
		}

		function findTouch (touchList, idx) {
			for (var i = 0; i < touchList.length; i++) {
				if (touchList[i].identifier === idx) {
					return touchList[i];
				}
			}
		}


		getClientXY.x = getClientX;
		getClientXY.y = getClientY;
		getClientXY.findTouch = findTouch;

		getClientXy = getClientXY;
		return getClientXy;
	}

	var isArray;
	var hasRequiredIsArray;

	function requireIsArray () {
		if (hasRequiredIsArray) return isArray;
		hasRequiredIsArray = 1;
		isArray = function(a){
			return a instanceof Array;
		};
		return isArray;
	}

	var isNumber;
	var hasRequiredIsNumber;

	function requireIsNumber () {
		if (hasRequiredIsNumber) return isNumber;
		hasRequiredIsNumber = 1;
		isNumber = function(a){
			return typeof a === 'number' || a instanceof Number;
		};
		return isNumber;
	}

	var isString;
	var hasRequiredIsString;

	function requireIsString () {
		if (hasRequiredIsString) return isString;
		hasRequiredIsString = 1;
		isString = function(a){
			return typeof a === 'string' || a instanceof String;
		};
		return isString;
	}

	var isFn;
	var hasRequiredIsFn;

	function requireIsFn () {
		if (hasRequiredIsFn) return isFn;
		hasRequiredIsFn = 1;
		isFn = function(a){
			return !!(a && a.apply);
		};
		return isFn;
	}

	/*!
	 * is-primitive <https://github.com/jonschlinkert/is-primitive>
	 *
	 * Copyright (c) 2014-present, Jon Schlinkert.
	 * Released under the MIT License.
	 */

	var isPrimitive;
	var hasRequiredIsPrimitive;

	function requireIsPrimitive () {
		if (hasRequiredIsPrimitive) return isPrimitive;
		hasRequiredIsPrimitive = 1;

		isPrimitive = function isPrimitive(val) {
		  if (typeof val === 'object') {
		    return val === null;
		  }
		  return typeof val !== 'function';
		};
		return isPrimitive;
	}

	/**
	 * @module  st8
	 *
	 * Micro state machine.
	 */

	var st8;
	var hasRequiredSt8;

	function requireSt8 () {
		if (hasRequiredSt8) return st8;
		hasRequiredSt8 = 1;


		var isPrimitive = requireIsPrimitive();


		// API constants
		State.OTHERWISE = '_';
		State.ENTER = 'enter';
		State.EXIT = 'exit';


		/**
		 * Create a new state controller based on states passed
		 *
		 * @constructor
		 *
		 * @param {object} settings Initial states
		 */

		function State(states, context){
			//ignore existing state
			if (states instanceof State) return states;

			//ensure new state instance is created
			if (!(this instanceof State)) return new State(states);

			//save states object
			this.states = states || {};

			//save context
			this.context = context || this;

			//initedFlag
			this.inited = false;
		}


		/**
		 * Go to a state
		 *
		 * @param {*} value Any new state to enter
		 */

		State.prototype.set = function (value) {
			var prevValue = this.state, states = this.states;
			var ENTER = State.ENTER, EXIT = State.EXIT, OTHERWISE = State.OTHERWISE;
			// console.group('set', value, prevValue);

			//leave old state
			var oldStateName = states[prevValue] !== undefined ? prevValue : OTHERWISE;
			var oldState = states[oldStateName];

			var leaveResult, leaveFlag = EXIT + oldStateName;
			if (this.inited) {
				if (oldState) {
					if (!this[leaveFlag]) {
						this[leaveFlag] = true;

						//if oldState has after method - call it
						leaveResult = oldState[EXIT] && oldState[EXIT].call ?
								oldState[EXIT].call(this.context) :
							oldState[1] && oldState[1].call ?
								oldState[1].call(this.context) : oldState[EXIT];

						//ignore changing if leave result is falsy
						if (leaveResult === false) {
							this[leaveFlag] = false;
							// console.groupEnd();
							return false;
						}

						//redirect, if returned anything
						else if (leaveResult !== undefined && leaveResult !== value) {
							this.set(leaveResult);
							this[leaveFlag] = false;
							// console.groupEnd();
							return false;
						}

						this[leaveFlag] = false;

						//ignore redirect
						if (this.state !== prevValue) {
							return;
						}
					}
				}

				//ignore not changed value
				if (value === prevValue) return false;
			}
			else {
				this.inited = true;
			}

			//set current value
			this.state = value;


			//try to enter new state
			var newStateName = states.hasOwnProperty(value) ? value : OTHERWISE;
			var newState = states[newStateName];
			var enterResult;
			var enterFlag = ENTER + newStateName;

			if (!this[enterFlag]) {
				this[enterFlag] = true;

				if (newState) {
					// enter pure function
					if (newState.call) {
						enterResult = newState.call(this.context);
					}
					// enter array
					else if (Array.isArray(newState)) {
						enterResult = (newState[0] && newState[0].call) ? newState[0].call(this.context, this) : newState[0];
					}
					// enter object with enter method
					else if (newState.hasOwnProperty(ENTER)) {
						enterResult = newState[ENTER].call ? newState[ENTER].call(this.context) : newState[ENTER];
					}
					else if (isPrimitive(newState)) {
						enterResult = newState;
					}
				}
				else {
					enterResult = newState;
				}

				//ignore entering falsy state
				if (enterResult === false) {
					this.set(prevValue);
					this[enterFlag] = false;
					// console.groupEnd();
					return false;
				}

				//redirect if returned anything but current state
				else if (enterResult !== undefined && enterResult !== value) {
					this.set(enterResult);
					this[enterFlag] = false;
					// console.groupEnd();
					return false;
				}

				this[enterFlag] = false;
			}

			// console.groupEnd();

			//return context to chain calls
			return this.context;
		};


		/** Get current state */

		State.prototype.get = function(){
			return this.state;
		};

		st8 = State;
		return st8;
	}

	/**
	 * Define stateful property on an object
	 */

	var defineState_1;
	var hasRequiredDefineState;

	function requireDefineState () {
		if (hasRequiredDefineState) return defineState_1;
		hasRequiredDefineState = 1;
		defineState_1 = defineState;

		var State = requireSt8();
			State.ENTER = 'before';
			State.EXIT = 'after';

		/**
		 * Define stateful property on a target
		 *
		 * @param {object} target Any object
		 * @param {string} property Property name
		 * @param {object} descriptor State descriptor
		 *
		 * @return {object} target
		 */
		function defineState (target, property, descriptor, isFn) {
			//define accessor on a target
			if (isFn) {
				target[property] = function () {
					if (arguments.length) {
						return state.set(arguments[0]);
					}
					else {
						return state.get();
					}
				};
			}

			//define setter/getter on a target
			else {
				Object.defineProperty(target, property, {
					set: function (value) {
						return state.set(value);
					},
					get: function () {
						return state.get();
					}
				});
			}

			//define state controller
			var state = new State(descriptor, target);

			return target;
		}
		return defineState_1;
	}

	var mutable;
	var hasRequiredMutable;

	function requireMutable () {
		if (hasRequiredMutable) return mutable;
		hasRequiredMutable = 1;
		mutable = extend;

		var hasOwnProperty = Object.prototype.hasOwnProperty;

		function extend(target) {
		    for (var i = 1; i < arguments.length; i++) {
		        var source = arguments[i];

		        for (var key in source) {
		            if (hasOwnProperty.call(source, key)) {
		                target[key] = source[key];
		            }
		        }
		    }

		    return target
		}
		return mutable;
	}

	/**
	 * Get fn wrapped with array/object attrs recognition
	 *
	 * @return {Function} Target function
	 */

	var wrap;
	var hasRequiredWrap;

	function requireWrap () {
		if (hasRequiredWrap) return wrap;
		hasRequiredWrap = 1;
		wrap = function(fn){
			return function (a) {
				var args = arguments;
				if (a instanceof Array) {
					var result = new Array(a.length), slice;
					for (var i = 0; i < a.length; i++){
						slice = [];
						for (var j = 0, l = args.length, val; j < l; j++){
							val = args[j] instanceof Array ? args[j][i] : args[j];
							val = val;
							slice.push(val);
						}
						result[i] = fn.apply(this, slice);
					}
					return result;
				}
				else if (typeof a === 'object') {
					var result = {}, slice;
					for (var i in a){
						slice = [];
						for (var j = 0, l = args.length, val; j < l; j++){
							val = typeof args[j] === 'object' ? args[j][i] : args[j];
							val = val;
							slice.push(val);
						}
						result[i] = fn.apply(this, slice);
					}
					return result;
				}
				else {
					return fn.apply(this, args);
				}
			};
		};
		return wrap;
	}

	/**
	 * @module  mumath/precision
	 *
	 * Get precision from float:
	 *
	 * @example
	 * 1.1 → 1, 1234 → 0, .1234 → 4
	 *
	 * @param {number} n
	 *
	 * @return {number} decimap places
	 */

	var precision;
	var hasRequiredPrecision;

	function requirePrecision () {
		if (hasRequiredPrecision) return precision;
		hasRequiredPrecision = 1;
		precision = requireWrap()(function(n){
			var s = n + '',
				d = s.indexOf('.') + 1;

			return !d ? 0 : s.length - d;
		});
		return precision;
	}

	/**
	 * Precision round
	 *
	 * @param {number} value
	 * @param {number} step Minimal discrete to round
	 *
	 * @return {number}
	 *
	 * @example
	 * toPrecision(213.34, 1) == 213
	 * toPrecision(213.34, .1) == 213.3
	 * toPrecision(213.34, 10) == 210
	 */

	var round;
	var hasRequiredRound;

	function requireRound () {
		if (hasRequiredRound) return round;
		hasRequiredRound = 1;
		var precision = requirePrecision();

		round = requireWrap()(function(value, step) {
			if (step === 0) return value;
			if (!step) return Math.round(value);
			step = parseFloat(step);
			value = Math.round(value / step) * step;
			return parseFloat(value.toFixed(precision(step)));
		});
		return round;
	}

	/**
	 * Clamp value.
	 * Detects proper clamp min/max.
	 *
	 * @param {number} a Current value to cut off
	 * @param {number} min One side limit
	 * @param {number} max Other side limit
	 *
	 * @return {number} Clamped value
	 */

	var clamp;
	var hasRequiredClamp;

	function requireClamp () {
		if (hasRequiredClamp) return clamp;
		hasRequiredClamp = 1;
		clamp = requireWrap()(function(a, min, max){
			return max > min ? Math.max(Math.min(a,max),min) : Math.max(Math.min(a,min),max);
		});
		return clamp;
	}

	/**
	 * Looping function for any framesize.
	 * Like fmod.
	 *
	 * @module  mumath/loop
	 *
	 */

	var mod;
	var hasRequiredMod;

	function requireMod () {
		if (hasRequiredMod) return mod;
		hasRequiredMod = 1;
		mod = requireWrap()(function (value, left, right) {
			//detect single-arg case, like mod-loop or fmod
			if (right === undefined) {
				right = left;
				left = 0;
			}

			//swap frame order
			if (left > right) {
				var tmp = right;
				right = left;
				left = tmp;
			}

			var frame = right - left;

			value = ((value + left) % frame) - left;
			if (value < left) value += frame;
			if (value > right) value -= frame;

			return value;
		});
		return mod;
	}

	/** generate unique id for selector */

	var getUid;
	var hasRequiredGetUid;

	function requireGetUid () {
		if (hasRequiredGetUid) return getUid;
		hasRequiredGetUid = 1;
		var counter = Date.now() % 1e9;

		getUid = function getUid(){
			return (Math.random() * 1e9 >>> 0) + (counter++);
		};
		return getUid;
	}

	var inherits = {exports: {}};

	var inherits_browser = {exports: {}};

	var hasRequiredInherits_browser;

	function requireInherits_browser () {
		if (hasRequiredInherits_browser) return inherits_browser.exports;
		hasRequiredInherits_browser = 1;
		if (typeof Object.create === 'function') {
		  // implementation from standard node.js 'util' module
		  inherits_browser.exports = function inherits(ctor, superCtor) {
		    if (superCtor) {
		      ctor.super_ = superCtor;
		      ctor.prototype = Object.create(superCtor.prototype, {
		        constructor: {
		          value: ctor,
		          enumerable: false,
		          writable: true,
		          configurable: true
		        }
		      });
		    }
		  };
		} else {
		  // old school shim for old browsers
		  inherits_browser.exports = function inherits(ctor, superCtor) {
		    if (superCtor) {
		      ctor.super_ = superCtor;
		      var TempCtor = function () {};
		      TempCtor.prototype = superCtor.prototype;
		      ctor.prototype = new TempCtor();
		      ctor.prototype.constructor = ctor;
		    }
		  };
		}
		return inherits_browser.exports;
	}

	var hasRequiredInherits;

	function requireInherits () {
		if (hasRequiredInherits) return inherits.exports;
		hasRequiredInherits = 1;
		try {
		  var util = require('util');
		  /* istanbul ignore next */
		  if (typeof util.inherits !== 'function') throw '';
		  inherits.exports = util.inherits;
		} catch (e) {
		  /* istanbul ignore next */
		  inherits.exports = requireInherits_browser();
		}
		return inherits.exports;
	}

	/**
	 * Simple draggable component
	 *
	 * @module draggy
	 */

	var draggy;
	var hasRequiredDraggy;

	function requireDraggy () {
		if (hasRequiredDraggy) return draggy;
		hasRequiredDraggy = 1;
		//work with css
		const css = requireCss();
		const parseCSSValue = requireParseValue();
		const selection = requireSelection();
		const offsets = requireOffset();
		const getTranslate = requireTranslate();
		const intersect = requireIntersects();
		const isFixed = requireIsFixed();

		//events
		const on = requireOn();
		const off = requireOff();
		const emit = requireEmit();
		const Emitter = require$$10;
		const getClientX = requireGetClientXy().x;
		const getClientY = requireGetClientXy().y;

		//utils
		const isArray = requireIsArray();
		const isNumber = requireIsNumber();
		requireIsString();
		const isFn = requireIsFn();
		const defineState = requireDefineState();
		const extend = requireMutable();
		const round = requireRound();
		const between = requireClamp();
		const loop = requireMod();
		const getUid = requireGetUid();
		const inherits =  requireInherits();


		const win = window, doc = document, root = doc.documentElement;


		/**
		 * Draggable controllers associated with elements.
		 *
		 * Storing them on elements is
		 * - leak-prone,
		 * - pollutes element’s namespace,
		 * - requires some artificial key to store,
		 * - unable to retrieve controller easily.
		 *
		 * That is why weakmap.
		 */
		const draggableCache = Draggable.cache = new WeakMap;



		/**
		 * Make an element draggable.
		 *
		 * @constructor
		 *
		 * @param {HTMLElement} target An element whether in/out of DOM
		 * @param {Object} options An draggable options
		 *
		 * @return {HTMLElement} Target element
		 */
		function Draggable(target, options) {
			if (!(this instanceof Draggable)) {
				return new Draggable(target, options);
			}

			var that = this;

			//ignore existing instance
			var instance = draggableCache.get(target);
			if (instance) {
				instance.state = 'reset';

				//take over options
				extend(instance, options);

				instance.update();

				return instance;
			}

			else {
				//get unique id for instance
				//needed to track event binders
				that.id = getUid();
				that._ns = '.draggy_' + that.id;

				//save element passed
				that.element = target;

				draggableCache.set(target, that);
			}

			//define state behaviour
			defineState(that, 'state', that.state);

			//preset handles
			that.currentHandles = [];

			//take over options
			extend(that, options);

			//define handle
			if (that.handle === undefined) {
				that.handle = that.element;
			}

			//setup droppable
			if (that.droppable) {
				that.initDroppable();
			}

			//try to calc out basic limits
			that.update();

			//go to initial state
			that.state = 'idle';
		}


		/** Inherit draggable from Emitter */
		inherits(Draggable, Emitter);


		//enable css3 by default
		Draggable.prototype.css3 = true;

		//both axes by default
		Draggable.prototype.axis = null;


		/** Init droppable "plugin" */
		Draggable.prototype.initDroppable = function () {
			var that = this;

			on(that, 'dragstart', function () {
				var that = this;
				that.dropTargets = q(that.droppable);
			});

			on(that, 'drag', function () {
				var that = this;

				if (!that.dropTargets) {
					return;
				}

				var thatRect = offsets(that.element);

				that.dropTargets.forEach(function (dropTarget) {
					var targetRect = offsets(dropTarget);

					if (intersect(thatRect, targetRect, that.droppableTolerance)) {
						if (that.droppableClass) {
							dropTarget.classList.add(that.droppableClass);
						}
						if (!that.dropTarget) {
							that.dropTarget = dropTarget;

							emit(that, 'dragover', dropTarget);
							emit(dropTarget, 'dragover', that);
						}
					}
					else {
						if (that.dropTarget) {
							emit(that, 'dragout', dropTarget);
							emit(dropTarget, 'dragout', that);

							that.dropTarget = null;
						}
						if (that.droppableClass) {
							dropTarget.classList.remove(that.droppableClass);
						}
					}
				});
			});

			on(that, 'dragend', function () {
				var that = this;

				//emit drop, if any
				if (that.dropTarget) {
					emit(that.dropTarget, 'drop', that);
					emit(that, 'drop', that.dropTarget);
					that.dropTarget.classList.remove(that.droppableClass);
					that.dropTarget = null;
				}
			});
		};


		/**
		 * Draggable behaviour
		 * @enum {string}
		 * @default is 'idle'
		 */
		Draggable.prototype.state = {
			//idle
			_: {
				before: function () {
					var that = this;

					that.element.classList.add('draggy-idle');

					//emit drag evts on element
					emit(that.element, 'idle', null, true);
					that.emit('idle');

					//reset keys
					that.ctrlKey = false;
					that.shiftKey = false;
					that.metaKey = false;
					that.altKey = false;

					//reset movement params
					that.movementX = 0;
					that.movementY = 0;
					that.deltaX = 0;
					that.deltaY = 0;

					on(doc, 'mousedown' + that._ns + ' touchstart' + that._ns, function (e) {
						//ignore non-draggy events
						if (!e.draggies) {
							return;
						}

						//ignore dragstart for not registered draggies
						if (e.draggies.indexOf(that) < 0) {
							return;
						}

						//if target is focused - ignore drag
						//FIXME: detect focused by whitelist of tags, name supposition may be wrong (idk, form elements have names, so likely to be focused by click)
						if (e.target.name !== undefined) {
							return;
						}

						//multitouch has multiple starts
						that.setTouch(e);

						//update movement params
						that.update(e);

						//go to threshold state
						that.state = 'threshold';
					});
				},
				after: function () {
					var that = this;

					that.element.classList.remove('draggy-idle');

					off(doc, that._ns);

					//set up tracking
					if (that.release) {
						that._trackingInterval = setInterval(function (e) {
							var now = Date.now();
							var elapsed = now - that.timestamp;

							//get delta movement since the last track
							var dX = that.prevX - that.frame[0];
							var dY = that.prevY - that.frame[1];
							that.frame[0] = that.prevX;
							that.frame[1] = that.prevY;

							var delta = Math.sqrt(dX * dX + dY * dY);

							//get speed as average of prev and current (prevent div by zero)
							var v = Math.min(that.velocity * delta / (1 + elapsed), that.maxSpeed);
							that.speed = 0.8 * v + 0.2 * that.speed;

							//get new angle as a last diff
							//NOTE: vector average isn’t the same as speed scalar average
							that.angle = Math.atan2(dY, dX);

							that.emit('track');

							return that;
						}, that.framerate);
					}
				}
			},

			threshold: {
				before: function () {
					var that = this;

					//ignore threshold state, if threshold is none
					if (isZeroArray(that.threshold)) {
						that.state = 'drag';
						return;
					}

					that.element.classList.add('draggy-threshold');

					//emit drag evts on element
					that.emit('threshold');
					emit(that.element, 'threshold');

					//listen to doc movement
					on(doc, 'touchmove' + that._ns + ' mousemove' + that._ns, function (e) {
						e.preventDefault();

						//compare movement to the threshold
						var clientX = getClientX(e, that.touchIdx);
						var clientY = getClientY(e, that.touchIdx);
						var difX = that.prevMouseX - clientX;
						var difY = that.prevMouseY - clientY;

						if (difX < that.threshold[0] || difX > that.threshold[2] || difY < that.threshold[1] || difY > that.threshold[3]) {
							that.update(e);
							that.state = 'drag';
						}
					});
					on(doc, 'mouseup' + that._ns + ' touchend' + that._ns + '', function (e) {
						e.preventDefault();

						//forget touches
						that.resetTouch();

						that.state = 'idle';
					});
				},

				after: function () {
					var that = this;

					that.element.classList.remove('draggy-threshold');

					off(doc, that._ns);
				}
			},

			drag: {
				before: function () {
					var that = this;

					//reduce dragging clutter
					selection.disable(root);

					that.element.classList.add('draggy-drag');

					//emit drag evts on element
					that.emit('dragstart');
					emit(that.element, 'dragstart', null, true);

					//emit drag events on that
					that.emit('drag');
					emit(that.element, 'drag', null, true);

					//stop drag on leave
					on(doc, 'touchend' + that._ns + ' mouseup' + that._ns + ' mouseleave' + that._ns, function (e) {
						e.preventDefault();

						//forget touches - dragend is called once
						that.resetTouch();

						//manage release movement
						if (that.speed > 1) {
							that.state = 'release';
						}

						else {
							that.state = 'idle';
						}
					});

					//move via transform
					on(doc, 'touchmove' + that._ns + ' mousemove' + that._ns, function (e) {
						that.drag(e);
					});
				},

				after: function () {
					var that = this;

					//enable document interactivity
					selection.enable(root);

					that.element.classList.remove('draggy-drag');

					//emit dragend on element, this
					that.emit('dragend');
					emit(that.element, 'dragend', null, true);

					//unbind drag events
					off(doc, that._ns);

					clearInterval(that._trackingInterval);
				}
			},

			release: {
				before: function () {
					var that = this;

					that.element.classList.add('draggy-release');

					//enter animation mode
					clearTimeout(that._animateTimeout);

					//set proper transition
					css(that.element, {
						'transition': (that.releaseDuration) + 'ms ease-out ' + (that.css3 ? 'transform' : 'position')
					});

					//plan leaving anim mode
					that._animateTimeout = setTimeout(function () {
						that.state = 'idle';
					}, that.releaseDuration);


					//calc target point & animate to it
					that.move(
						that.prevX + that.speed * Math.cos(that.angle),
						that.prevY + that.speed * Math.sin(that.angle)
					);

					that.speed = 0;
					that.emit('track');
				},

				after: function () {
					var that = this;

					that.element.classList.remove('draggy-release');

					css(this.element, {
						'transition': null
					});
				}
			},

			reset: function () {
				var that = this;

				that.currentHandles.forEach(function (handle) {
					off(handle, that._ns);
				});

				clearTimeout(that._animateTimeout);

				off(doc, that._ns);
				off(that.element, that._ns);

				return '_';
			}
		};


		/** Drag handler. Needed to provide drag movement emulation via API */
		Draggable.prototype.drag = function (e) {
			var that = this;

			e.preventDefault();

			var mouseX = getClientX(e, that.touchIdx),
				mouseY = getClientY(e, that.touchIdx);

			//calc mouse movement diff
			var diffMouseX = mouseX - that.prevMouseX,
				diffMouseY = mouseY - that.prevMouseY;

			//absolute mouse coordinate
			var mouseAbsX = mouseX,
				mouseAbsY = mouseY;

			//if we are not fixed, our absolute position is relative to the doc
			if (!that._isFixed) {
				mouseAbsX += win.pageXOffset;
				mouseAbsY += win.pageYOffset;
			}

			//calc sniper offset, if any
			if (e.ctrlKey || e.metaKey) {
				that.sniperOffsetX += diffMouseX * that.sniperSlowdown;
				that.sniperOffsetY += diffMouseY * that.sniperSlowdown;
			}

			//save refs to the meta keys
			that.ctrlKey = e.ctrlKey;
			that.shiftKey = e.shiftKey;
			that.metaKey = e.metaKey;
			that.altKey = e.altKey;

			//calc movement x and y
			//take absolute placing as it is the only reliable way (2x proved)
			var x = (mouseAbsX - that.initOffsetX) - that.innerOffsetX - that.sniperOffsetX,
				y = (mouseAbsY - that.initOffsetY) - that.innerOffsetY - that.sniperOffsetY;

			//move element
			that.move(x, y);

			//save prevClientXY for calculating diff
			that.prevMouseX = mouseX;
			that.prevMouseY = mouseY;

			//emit drag
			that.emit('drag');
			emit(that.element, 'drag', null, true);
		};


		/** Current number of draggable touches */
		var touches = 0;


		/** Manage touches */
		Draggable.prototype.setTouch = function (e) {
			if (!e.touches || this.isTouched()) return this;

			//current touch index
			this.touchIdx = touches;
			touches++;

			return this;
		};
		Draggable.prototype.resetTouch = function () {
			touches = 0;
			this.touchIdx = null;

			return this;
		};
		Draggable.prototype.isTouched = function () {
			return this.touchIdx !== null;
		};


		/** Index to fetch touch number from event */
		Draggable.prototype.touchIdx = null;


		/**
		 * Update movement limits.
		 * Refresh that.withinOffsets and that.limits.
		 */
		Draggable.prototype.update = function (e) {
			var that = this;

			that._isFixed = isFixed(that.element);

			//enforce abs position
			if (!that.css3) {
				css(this.element, 'position', 'absolute');
			}

			//update handles
			that.currentHandles.forEach(function (handle) {
				off(handle, that._ns);
			});

			var cancelEls = q(that.cancel);

			that.currentHandles = q(that.handle);

			that.currentHandles.forEach(function (handle) {
				on(handle, 'mousedown' + that._ns + ' touchstart' + that._ns, function (e) {
					//mark event as belonging to the draggy
					if (!e.draggies) {
						e.draggies = [];
					}

					//ignore draggies containing other draggies
					if (e.draggies.some(function (draggy) {
						return that.element.contains(draggy.element);
					})) {
						return;
					}
					//ignore events happened within cancelEls
					if (cancelEls.some(function (cancelEl) {
						return cancelEl.contains(e.target);
					})) {
						return;
					}

					//register draggy
					e.draggies.push(that);
				});
			});

			//update limits
			that.updateLimits();

			//preset inner offsets
			that.innerOffsetX = that.pin[0];
			that.innerOffsetY = that.pin[1];

			var thatClientRect = that.element.getBoundingClientRect();

			//if event passed - update acc to event
			if (e) {
				//take last mouse position from the event
				that.prevMouseX = getClientX(e, that.touchIdx);
				that.prevMouseY = getClientY(e, that.touchIdx);

				//if mouse is within the element - take offset normally as rel displacement
				that.innerOffsetX = -thatClientRect.left + getClientX(e, that.touchIdx);
				that.innerOffsetY = -thatClientRect.top + getClientY(e, that.touchIdx);
			}
			//if no event - suppose pin-centered event
			else {
				//take mouse position & inner offset as center of pin
				var pinX = (that.pin[0] + that.pin[2] ) * 0.5;
				var pinY = (that.pin[1] + that.pin[3] ) * 0.5;
				that.prevMouseX = thatClientRect.left + pinX;
				that.prevMouseY = thatClientRect.top + pinY;
				that.innerOffsetX = pinX;
				that.innerOffsetY = pinY;
			}

			//set initial kinetic props
			that.speed = 0;
			that.amplitude = 0;
			that.angle = 0;
			that.timestamp = +new Date();
			that.frame = [that.prevX, that.prevY];

			//set sniper offset
			that.sniperOffsetX = 0;
			that.sniperOffsetY = 0;
		};

		/**
		 * Update limits only from current position
		 */
		Draggable.prototype.updateLimits = function () {
			var that = this;

			//initial translation offsets
			var initXY = that.getCoords();

			//calc initial coords
			that.prevX = initXY[0];
			that.prevY = initXY[1];
			that.initX = initXY[0];
			that.initY = initXY[1];

			//container rect might be outside the vp, so calc absolute offsets
			//zero-position offsets, with translation(0,0)
			var thatOffsets = offsets(that.element);

			that.initOffsetX = thatOffsets.left - that.prevX;
			that.initOffsetY = thatOffsets.top - that.prevY;
			that.offsets = thatOffsets;

			//handle parent case
			var within = that.within;
			if (that.within === 'parent' || that.within === true) {
				within = that.element.parentNode;
			}
			within = within || doc;

			//absolute offsets of a container
			var withinOffsets = offsets(within);

			if (within === win && that._isFixed) {
				withinOffsets.top -= win.pageYOffset;
				withinOffsets.left -= win.pageXOffset;
				withinOffsets.bottom -= win.pageYOffset;
				withinOffsets.right -= win.pageXOffset;
			}
			that.withinOffsets = withinOffsets;

			//calculate movement limits - pin width might be wider than constraints
			that.overflowX = that.pin.width - withinOffsets.width;
			that.overflowY = that.pin.height - withinOffsets.height;

			that.limits = {
				left: withinOffsets.left - that.initOffsetX - that.pin[0] - (that.overflowX < 0 ? 0 : that.overflowX),
				top: withinOffsets.top - that.initOffsetY - that.pin[1] - (that.overflowY < 0 ? 0 : that.overflowY),
				right: that.overflowX > 0 ? 0 : withinOffsets.right - that.initOffsetX - that.pin[2],
				bottom: (that.overflowY > 0 ? 0 : withinOffsets.bottom - that.initOffsetY - that.pin[3])
			};
		};

		/**
		 * Update info regarding of movement
		 */
		Draggable.prototype.updateInfo = function (x, y) {
			var that = this;

			//provide delta from prev state
			that.deltaX = x - that.prevX;
			that.deltaY = y - that.prevY;

			//save prev coords to use as a start point next time
			that.prevX = x;
			that.prevY = y;

			//provide movement delta from initial state
			that.movementX = x - that.initX;
			that.movementY = y - that.initY;

		};


		/**
		 * Way of placement:
		 * - css3 === false (slower but more precise and cross-browser)
		 * - css3 === true (faster but may cause blurs on linux systems)
		 */
		Draggable.prototype.getCoords = function () {
			if (!this.css3) {
				// return [this.element.offsetLeft, this.element.offsetTop];
				return [parseCSSValue(css(this.element,'left')), parseCSSValue(css(this.element, 'top'))];
			}
			else {
				return getTranslate(this.element).slice(0, 2) || [0,0];
			}
		};
		Draggable.prototype.setCoords = function (x, y) {
			if (this.css3) {
				if (x == null) x = this.prevX;
				if (y == null) y = this.prevY;

				x = round(x, this.precision);
				y = round(y, this.precision);

				css(this.element, 'transform', ['translate3d(', x, 'px,', y, 'px, 0)'].join(''));

				this.updateInfo(x, y);
			}
			else {
				if (x == null) x = this.prevX;
				if (y == null) y = this.prevY;

				x = round(x, this.precision);
				y = round(y, this.precision);

				css(this.element, {
					left: x,
					top: y
				});

				//update movement info
				this.updateInfo(x, y);
			}
		};


		/**
		 * Restricting container
		 * @type {Element|object}
		 * @default doc.documentElement
		 */
		Draggable.prototype.within = doc;


		/** Handle to drag */
		Draggable.prototype.handle;


		Object.defineProperties(Draggable.prototype, {
			/**
			 * Which area of draggable should not be outside the restriction area.
			 * @type {(Array|number)}
			 * @default [0,0,this.element.offsetWidth, this.element.offsetHeight]
			 */
			pin: {
				set: function (value) {
					if (isArray(value)) {
						if (value.length === 2) {
							this._pin = [value[0], value[1], value[0], value[1]];
						} else if (value.length === 4) {
							this._pin = value;
						}
					}

					else if (isNumber(value)) {
						this._pin = [value, value, value, value];
					}

					else {
						this._pin = value;
					}

					//calc pin params
					this._pin.width = this._pin[2] - this._pin[0];
					this._pin.height = this._pin[3] - this._pin[1];
				},

				get: function () {
					if (this._pin) return this._pin;

					//returning autocalculated pin, if private pin is none
					var pin = [0,0, this.offsets.width, this.offsets.height];
					pin.width = this.offsets.width;
					pin.height = this.offsets.height;
					return pin;
				}
			},

			/** Avoid initial mousemove */
			threshold: {
				set: function (val) {
					if (isNumber(val)) {
						this._threshold = [-val*0.5, -val*0.5, val*0.5, val*0.5];
					} else if (val.length === 2) {
						//Array(w,h)
						this._threshold = [-val[0]*0.5, -val[1]*0.5, val[0]*0.5, val[1]*0.5];
					} else if (val.length === 4) {
						//Array(x1,y1,x2,y2)
						this._threshold = val;
					} else if (isFn(val)) {
						//custom val funciton
						this._threshold = val();
					} else {
						this._threshold = [0,0,0,0];
					}
				},

				get: function () {
					return this._threshold || [0,0,0,0];
				}
			}
		});



		/**
		 * For how long to release movement
		 *
		 * @type {(number|false)}
		 * @default false
		 * @todo
		 */
		Draggable.prototype.release = false;
		Draggable.prototype.releaseDuration = 500;
		Draggable.prototype.velocity = 1000;
		Draggable.prototype.maxSpeed = 250;
		Draggable.prototype.framerate = 50;


		/** To what extent round position */
		Draggable.prototype.precision = 1;


		/** Droppable params */
		Draggable.prototype.droppable = null;
		Draggable.prototype.droppableTolerance = 0.5;
		Draggable.prototype.droppableClass = null;


		/** Slow down movement by pressing ctrl/cmd */
		Draggable.prototype.sniper = true;


		/** How much to slow sniper drag */
		Draggable.prototype.sniperSlowdown = .85;


		/**
		 * Restrict movement by axis
		 *
		 * @default undefined
		 * @enum {string}
		 */
		Draggable.prototype.move = function (x, y) {
			if (this.axis === 'x') {
				if (x == null) x = this.prevX;
				if (y == null) y = this.prevY;

				var limits = this.limits;

				if (this.repeat) {
					var w = (limits.right - limits.left);
					var oX = - this.initOffsetX + this.withinOffsets.left - this.pin[0] - Math.max(0, this.overflowX);
					x = loop(x - oX, w) + oX;
				} else {
					x = between(x, limits.left, limits.right);
				}

				this.setCoords(x);
			}
			else if (this.axis === 'y') {
				if (x == null) x = this.prevX;
				if (y == null) y = this.prevY;

				var limits = this.limits;

				if (this.repeat) {
					var h = (limits.bottom - limits.top);
					var oY = - this.initOffsetY + this.withinOffsets.top - this.pin[1] - Math.max(0, this.overflowY);
					y = loop(y - oY, h) + oY;
				} else {
					y = between(y, limits.top, limits.bottom);
				}

				this.setCoords(null, y);
			}
			else {
				if (x == null) x = this.prevX;
				if (y == null) y = this.prevY;

				var limits = this.limits;

				if (this.repeat) {
					var w = (limits.right - limits.left);
					var h = (limits.bottom - limits.top);
					var oX = - this.initOffsetX + this.withinOffsets.left - this.pin[0] - Math.max(0, this.overflowX);
					var oY = - this.initOffsetY + this.withinOffsets.top - this.pin[1] - Math.max(0, this.overflowY);
					if (this.repeat === 'x') {
						x = loop(x - oX, w) + oX;
					}
					else if (this.repeat === 'y') {
						y = loop(y - oY, h) + oY;
					}
					else {
						x = loop(x - oX, w) + oX;
						y = loop(y - oY, h) + oY;
					}
				}

				x = between(x, limits.left, limits.right);
				y = between(y, limits.top, limits.bottom);

				this.setCoords(x, y);
			}
		};


		/** Repeat movement by one of axises */
		Draggable.prototype.repeat = false;


		/** Check whether arr is filled with zeros */
		function isZeroArray(arr) {
			if (!arr[0] && !arr[1] && !arr[2] && !arr[3]) return true;
		}



		/** Clean all memory-related things */
		Draggable.prototype.destroy = function () {
			var that = this;

			that.currentHandles.forEach(function (handle) {
				off(handle, that._ns);
			});

			that.state = 'destroy';

			clearTimeout(that._animateTimeout);

			off(doc, that._ns);
			off(that.element, that._ns);


			that.element = null;
			that.within = null;
		};



		//little helpers

		function q (str) {
			if (Array.isArray(str)) {
				return str.map(q).reduce(function(prev, curr) { return prev.concat(curr); }, [] );
			}
			else if (str instanceof HTMLElement) {
				return [str];
			}
			else {
				return [].slice.call(document.querySelectorAll(str));
			}
		}


		draggy = Draggable;
		return draggy;
	}

	/**
	 * @module mutype/is-object
	 */

	var isObject;
	var hasRequiredIsObject;

	function requireIsObject () {
		if (hasRequiredIsObject) return isObject;
		hasRequiredIsObject = 1;
		//TODO: add st8 tests

		//isPlainObject indeed
		isObject = function(o){
			// return obj === Object(obj);
			return !!o && typeof o === 'object' && o.constructor === Object;
		};
		return isObject;
	}

	var has;
	var hasRequiredHas;

	function requireHas () {
		if (hasRequiredHas) return has;
		hasRequiredHas = 1;
		//speedy implementation of `in`
		//NOTE: `!target[propName]` 2-3 orders faster than `!(propName in target)`
		has = function(a, b){
			if (!a) return false;

			//NOTE: this causes getter fire
			if (a[b]) return true;

			//FIXME: why in is better than hasOwnProperty? Something with prototypes. Show a case.
			return b in a;
			// return a.hasOwnProperty(b);
		};
		return has;
	}

	var isBool;
	var hasRequiredIsBool;

	function requireIsBool () {
		if (hasRequiredIsBool) return isBool;
		hasRequiredIsBool = 1;
		isBool = function(a){
			return typeof a === 'boolean' || a instanceof Boolean;
		};
		return isBool;
	}

	var isPlain;
	var hasRequiredIsPlain;

	function requireIsPlain () {
		if (hasRequiredIsPlain) return isPlain;
		hasRequiredIsPlain = 1;
		var isString = requireIsString(),
			isNumber = requireIsNumber(),
			isBool = requireIsBool();

		isPlain = function isPlain(a){
			return !a || isString(a) || isNumber(a) || isBool(a);
		};
		return isPlain;
	}

	var isArrayLike;
	var hasRequiredIsArrayLike;

	function requireIsArrayLike () {
		if (hasRequiredIsArrayLike) return isArrayLike;
		hasRequiredIsArrayLike = 1;
		var isString = requireIsString();
		var isArray = requireIsArray();
		var isFn = requireIsFn();

		//FIXME: add tests from http://jsfiddle.net/ku9LS/1/
		isArrayLike = function (a){
			return isArray(a) || (a && !isString(a) && !a.nodeType && (typeof window != 'undefined' ? a != window : true) && !isFn(a) && typeof a.length === 'number');
		};
		return isArrayLike;
	}

	var isElement;
	var hasRequiredIsElement;

	function requireIsElement () {
		if (hasRequiredIsElement) return isElement;
		hasRequiredIsElement = 1;
		isElement = function(target){
			return typeof document !== 'undefined' && target instanceof HTMLElement;
		};
		return isElement;
	}

	var isPrivateName;
	var hasRequiredIsPrivateName;

	function requireIsPrivateName () {
		if (hasRequiredIsPrivateName) return isPrivateName;
		hasRequiredIsPrivateName = 1;
		isPrivateName = function(n){
			return n[0] === '_' && n.length > 1;
		};
		return isPrivateName;
	}

	var isRegex;
	var hasRequiredIsRegex;

	function requireIsRegex () {
		if (hasRequiredIsRegex) return isRegex;
		hasRequiredIsRegex = 1;
		isRegex = function(target){
			return target instanceof RegExp;
		};
		return isRegex;
	}

	var isEmpty;
	var hasRequiredIsEmpty;

	function requireIsEmpty () {
		if (hasRequiredIsEmpty) return isEmpty;
		hasRequiredIsEmpty = 1;
		isEmpty = function(a){
			if (!a) return true;
			for (var k in a) {
				return false;
			}
			return true;
		};
		return isEmpty;
	}

	/**
	* Trivial types checkers.
	* Because there’re no common lib for that ( lodash_ is a fatguy)
	*/

	var mutype;
	var hasRequiredMutype;

	function requireMutype () {
		if (hasRequiredMutype) return mutype;
		hasRequiredMutype = 1;
		//TODO: make main use as `is.array(target)`
		//TODO: separate by libs, included per-file

		mutype = {
			has: requireHas(),
			isObject: requireIsObject(),
			isFn: requireIsFn(),
			isString: requireIsString(),
			isNumber: requireIsNumber(),
			isBoolean: requireIsBool(),
			isPlain: requireIsPlain(),
			isArray: requireIsArray(),
			isArrayLike: requireIsArrayLike(),
			isElement: requireIsElement(),
			isPrivateName: requireIsPrivateName(),
			isRegExp: requireIsRegex(),
			isEmpty: requireIsEmpty()
		};
		return mutype;
	}

	var splitKeys_1;
	var hasRequiredSplitKeys;

	function requireSplitKeys () {
		if (hasRequiredSplitKeys) return splitKeys_1;
		hasRequiredSplitKeys = 1;
		var type = requireMutype();
		var extend = requireMutable();

		splitKeys_1 = splitKeys;


		/**
		 * Disentangle listed keys
		 *
		 * @param {Object} obj An object with key including listed declarations
		 * @example {'a,b,c': 1}
		 *
		 * @param {boolean} deep Whether to flatten nested objects
		 *
		 * @todo Think to provide such method on object prototype
		 *
		 * @return {oblect} Source set passed {@link set}
		 */
		function splitKeys(obj, deep, separator){
			//swap args, if needed
			if ((deep || separator) && (type.isBoolean(separator) || type.isString(deep) || type.isRegExp(deep))) {
				var tmp = deep;
				deep = separator;
				separator = tmp;
			}

			//ensure separator
			separator = separator === undefined ? splitKeys.separator : separator;

			var list, value;

			for(var keys in obj){
				value = obj[keys];

				if (deep && type.isObject(value)) splitKeys(value, deep, separator);

				list = keys.split(separator);

				if (list.length > 1){
					delete obj[keys];
					list.forEach(setKey);
				}
			}

			function setKey(key){
				//if existing key - extend, if possible
				//FIXME: obj[key] might be not an object, but function, for example
				if (value !== obj[key] && type.isObject(value) && type.isObject(obj[key])) {
					obj[key] = extend({}, obj[key], value);
				}
				//or replace
				else {
					obj[key] = value;
				}
			}

			return obj;
		}


		/** default separator */
		splitKeys.separator = /\s?,\s?/;
		return splitKeys_1;
	}

	/**
	 * Caclulate paddings of an element.
	 * @module  mucss/paddings
	 */

	var padding;
	var hasRequiredPadding;

	function requirePadding () {
		if (hasRequiredPadding) return padding;
		hasRequiredPadding = 1;
		var Rect = requireRect();
		var parse = requireParseValue();


		/**
		 * Return paddings of an element.
		 *
		 * @param    {Element}   el   An element to calc paddings.
		 * @return   {Object}   Paddings object `{top:n, bottom:n, left:n, right:n}`.
		 */
		padding = function(el){
			if (el === window) return Rect();

			if (!(el instanceof Element)) throw Error('Argument is not an element');

			var style = window.getComputedStyle(el);

			return Rect(
				parse(style.paddingLeft),
				parse(style.paddingTop),
				parse(style.paddingRight),
				parse(style.paddingBottom)
			);
		};
		return padding;
	}

	/**
	 * Parse element’s borders
	 *
	 * @module mucss/borders
	 */

	var border;
	var hasRequiredBorder;

	function requireBorder () {
		if (hasRequiredBorder) return border;
		hasRequiredBorder = 1;
		var Rect = requireRect();
		var parse = requireParseValue();

		/**
		 * Return border widths of an element
		 */
		border = function(el){
			if (el === window) return Rect();

			if (!(el instanceof Element)) throw Error('Argument is not an element');

			var style = window.getComputedStyle(el);

			return Rect(
				parse(style.borderLeftWidth),
				parse(style.borderTopWidth),
				parse(style.borderRightWidth),
				parse(style.borderBottomWidth)
			);
		};
		return border;
	}

	/**
	 * Get margins of an element.
	 * @module mucss/margins
	 */

	var margin;
	var hasRequiredMargin;

	function requireMargin () {
		if (hasRequiredMargin) return margin;
		hasRequiredMargin = 1;
		var parse = requireParseValue();
		var Rect = requireRect();

		/**
		 * Return margins of an element.
		 *
		 * @param    {Element}   el   An element which to calc margins.
		 * @return   {Object}   Paddings object `{top:n, bottom:n, left:n, right:n}`.
		 */
		margin = function(el){
			if (el === window) return Rect();

			if (!(el instanceof Element)) throw Error('Argument is not an element');

			var style = window.getComputedStyle(el);

			return Rect(
				parse(style.marginLeft),
				parse(style.marginTop),
				parse(style.marginRight),
				parse(style.marginBottom)
			);
		};
		return margin;
	}

	/**
	 * @module  resizable
	 */

	var resizable;
	var hasRequiredResizable;

	function requireResizable () {
		if (hasRequiredResizable) return resizable;
		hasRequiredResizable = 1;
		var Draggable = requireDraggy();
		var emit = requireEmit();
		requireOn();
		var isArray = requireIsArray();
		var isString = requireIsString();
		var isObject = requireIsObject();
		var extend = requireMutable();
		var inherit = requireInherits();
		var Emitter = require$$10;
		var between = requireClamp();
		var splitKeys = requireSplitKeys();
		var css = requireCss();
		var paddings = requirePadding();
		var borders = requireBorder();
		var margins = requireMargin();
		var offsets = requireOffset();


		var doc = document, root = doc.documentElement;


		/**
		 * Make an element resizable.
		 *
		 * Note that we don’t need a container option
		 * as arbitrary container is emulatable via fake resizable.
		 *
		 * @constructor
		 */
		function Resizable (el, options) {
			var self = this;

			if (!(self instanceof Resizable)) {
				return new Resizable(el, options);
			}

			self.element = el;

			extend(self, options);

			//if element isn’t draggable yet - force it to be draggable, without movements
			if (self.draggable === true) {
				self.draggable = new Draggable(self.element, {
					within: self.within,
					css3: self.css3
				});
			} else if (self.draggable) {
				self.draggable = new Draggable(self.element, self.draggable);
				self.draggable.css3 = self.css3;
			} else {
				self.draggable = new Draggable(self.element, {
					handle: null
				});
			}

			self.createHandles();

			//bind event, if any
			if (self.resize) {
				self.on('resize', self.resize);
			}
		}

		inherit(Resizable, Emitter);


		var proto = Resizable.prototype;


		/** Use css3 for draggable, if any */
		proto.css3 = true;


		/** Make itself draggable to the row */
		proto.draggable = false;



		/** Create handles according to options */
		proto.createHandles = function () {
			var self = this;

			//init handles
			var handles;

			//parse value
			if (isArray(self.handles)) {
				handles = {};
				for (var i = self.handles.length; i--;){
					handles[self.handles[i]] = null;
				}
			}
			else if (isString(self.handles)) {
				handles = {};
				var arr = self.handles.match(/([swne]+)/g);
				for (var i = arr.length; i--;){
					handles[arr[i]] = null;
				}
			}
			else if (isObject(self.handles)) {
				handles = self.handles;
			}
			//default set of handles depends on position.
			else {
				var position = getComputedStyle(self.element).position;
				var display = getComputedStyle(self.element).display;
				//if display is inline-like - provide only three handles
				//it is position: static or display: inline
				if (/inline/.test(display) || /static/.test(position)){
					handles = {
						s: null,
						se: null,
						e: null
					};

					//ensure position is not static
					css(self.element, 'position', 'relative');
				}
				//else - all handles
				else {
					handles = {
						s: null,
						se: null,
						e: null,
						ne: null,
						n: null,
						nw: null,
						w: null,
						sw: null
					};
				}
			}
			for (var direction in handles) {
				handles[direction] = self.createHandle(handles[direction], direction);
			}

			//save handles elements
			self.handles = handles;
		};


		/** Create handle for the direction */
		proto.createHandle = function(handle, direction){
			var self = this;

			var el = self.element;

			//make handle element
			if (!handle) {
				handle = document.createElement('div');
				handle.classList.add('resizable-handle');
			}

			//insert handle to the element
			self.element.appendChild(handle);

			//save direction
			handle.direction = direction;

			//detect self.within
			//FIXME: may be painful if resizable is created on detached element
			var within = self.within === 'parent' ? self.element.parentNode : self.within;

			//make handle draggable
			var draggy = new Draggable(handle, {
				within: within,
				//can’t use abs pos, as we engage it in styling
				// css3: false,
				threshold: self.threshold,
				axis: /^[ns]$/.test(direction) ? 'y' : /^[we]$/.test(direction) ? 'x' : 'both'
			});

			draggy.on('dragstart', function (e) {
				self.m = margins(el);
				self.b = borders(el);
				self.p = paddings(el);

				//update draggalbe params
				self.draggable.update(e);

				//save initial dragging offsets
				getComputedStyle(el);
				self.offsets = self.draggable.getCoords();

				//recalc border-box
				if (getComputedStyle(el).boxSizing === 'border-box') {
					self.p.top = 0;
					self.p.bottom = 0;
					self.p.left = 0;
					self.p.right = 0;
					self.b.top = 0;
					self.b.bottom = 0;
					self.b.left = 0;
					self.b.right = 0;
				}

				//save initial size
				self.initSize = [el.offsetWidth - self.b.left - self.b.right - self.p.left - self.p.right, el.offsetHeight - self.b.top - self.b.bottom - self.p.top - self.p.bottom];

				//save initial full size
				self.initSizeFull = [
					el.offsetWidth,
					el.offsetHeight
				];

				//movement prev coords
				self.prevCoords = [0, 0];

				//shift-caused offset
				self.shiftOffset = [0, 0];

				//central initial coords
				self.center = [self.offsets[0] + self.initSize[0]/2, self.offsets[1] + self.initSize[1]/2];

				//calc limits (max height/width from left/right)
				if (self.within) {
					var po = offsets(within);
					var o = offsets(el);
					self.maxSize = [
						o.left - po.left + self.initSize[0],
						o.top - po.top + self.initSize[1],
						po.right - o.right + self.initSize[0],
						po.bottom - o.bottom + self.initSize[1]
					];
				} else {
					self.maxSize = [9999, 9999, 9999, 9999];
				}

				//preset mouse cursor
				css(root, {
					'cursor': direction + '-resize'
				});

				//clear cursors
				for (var h in self.handles){
					css(self.handles[h], 'cursor', null);
				}

				//trigger callbacks
				emit(self, 'resizestart');
				emit(el, 'resizestart');
			});

			draggy.on('drag', function () {
				var coords = draggy.getCoords();

				var prevSize = [
					el.offsetWidth,
					el.offsetHeight
				];

				//change width/height properly
				if (draggy.shiftKey) {
					switch (direction) {
						case 'se':
						case 's':
						case 'e':
							break;
						case 'nw':
							coords[0] = -coords[0];
							coords[1] = -coords[1];
							break;
						case 'n':
							coords[1] = -coords[1];
							break;
						case 'w':
							coords[0] = -coords[0];
							break;
						case 'ne':
							coords[1] = -coords[1];
							break;
						case 'sw':
							coords[0] = -coords[0];
							break;
					}
					//set placement is relative to initial center line
					css(el, {
						width: Math.min(
							self.initSize[0] + coords[0]*2,
							self.maxSize[2] + coords[0],
							self.maxSize[0] + coords[0]
						),
						height: Math.min(
							self.initSize[1] + coords[1]*2,
							self.maxSize[3] + coords[1],
							self.maxSize[1] + coords[1]
						)
					});

					var difX = prevSize[0] - el.offsetWidth;
					var difY = prevSize[1] - el.offsetHeight;

					//update draggable limits
					self.draggable.updateLimits();

					if (difX) {
						self.draggable.move(self.center[0] - self.initSize[0]/2 - coords[0]);
					}

					if (difY) {
						self.draggable.move(null, self.center[1] - self.initSize[1]/2 - coords[1]);
					}
				}
				else {
					switch (direction) {
						case 'se':
							css(el, {
								width: Math.min(
									self.initSize[0] + coords[0],
									self.maxSize[2]
								),
								height: Math.min(
									self.initSize[1] + coords[1],
									self.maxSize[3]
								)
							});

						case 's':
							css(el, {
								height: Math.min(
									self.initSize[1] + coords[1],
									self.maxSize[3]
								)
							});

						case 'e':
							css(el, {
								width: Math.min(
									self.initSize[0] + coords[0],
									self.maxSize[2]
								)
							});
						case 'se':
						case 's':
						case 'e':
							self.draggable.updateLimits();

							self.draggable.move(
								self.center[0] - self.initSize[0]/2,
								self.center[1] - self.initSize[1]/2
							);

							break;

						case 'nw':
							css(el, {
								width: between(self.initSize[0] - coords[0], 0, self.maxSize[0]),
								height: between(self.initSize[1] - coords[1], 0, self.maxSize[1])
							});
						case 'n':
							css(el, {
								height: between(self.initSize[1] - coords[1], 0, self.maxSize[1])
							});
						case 'w':
							css(el, {
								width: between(self.initSize[0] - coords[0], 0, self.maxSize[0])
							});
						case 'nw':
						case 'n':
						case 'w':
							self.draggable.updateLimits();

							//subtract t/l on changed size
							var deltaX = self.initSizeFull[0] - el.offsetWidth;
							var deltaY = self.initSizeFull[1] - el.offsetHeight;

							self.draggable.move(self.offsets[0] + deltaX, self.offsets[1] + deltaY);
							break;

						case 'ne':
							css(el, {
								width: between(self.initSize[0] + coords[0], 0, self.maxSize[2]),
								height: between(self.initSize[1] - coords[1], 0, self.maxSize[1])
							});

							self.draggable.updateLimits();

							//subtract t/l on changed size
							var deltaY = self.initSizeFull[1] - el.offsetHeight;

							self.draggable.move(null, self.offsets[1] + deltaY);
							break;
						case 'sw':
							css(el, {
								width: between(self.initSize[0] - coords[0], 0, self.maxSize[0]),
								height: between(self.initSize[1] + coords[1], 0, self.maxSize[3])
							});

							self.draggable.updateLimits();

							//subtract t/l on changed size
							var deltaX = self.initSizeFull[0] - el.offsetWidth;

							self.draggable.move(self.offsets[0] + deltaX);
							break;
					}			}

				//trigger callbacks
				emit(self, 'resize');
				emit(el, 'resize');

				draggy.setCoords(0,0);
			});

			draggy.on('dragend', function(){
				//clear cursor & pointer-events
				css(root, {
					'cursor': null
				});

				//get back cursors
				for (var h in self.handles){
					css(self.handles[h], 'cursor', self.handles[h].direction + '-resize');
				}

				//trigger callbacks
				emit(self, 'resizeend');
				emit(el, 'resizeend');
			});

			//append styles
			css(handle, handleStyles[direction]);
			css(handle, 'cursor', direction + '-resize');

			//append proper class
			handle.classList.add('resizable-handle-' + direction);

			return handle;
		};


		/** deconstructor - removes any memory bindings */
		proto.destroy = function () {
			//remove all handles
			for (var hName in this.handles){
				this.element.removeChild(this.handles[hName]);
				Draggable.cache.get(this.handles[hName]).destroy();
			}


			//remove references
			this.element = null;
		};


		var w = 10;

		/** Threshold size */
		proto.threshold = w;

		/** Styles for handles */
		var handleStyles = splitKeys({
			'e,w,n,s,nw,ne,sw,se': {
				'position': 'absolute'
			},
			'e,w': {
				'top, bottom':0,
				'width': w
			},
			'e': {
				'left': 'auto',
				'right': -w/2
			},
			'w': {
				'right': 'auto',
				'left': -w/2
			},
			's': {
				'top': 'auto',
				'bottom': -w/2
			},
			'n': {
				'bottom': 'auto',
				'top': -w/2
			},
			'n,s': {
				'left, right': 0,
				'height': w
			},
			'nw,ne,sw,se': {
				'width': w,
				'height': w,
				'z-index': 1
			},
			'nw': {
				'top, left': -w/2,
				'bottom, right': 'auto'
			},
			'ne': {
				'top, right': -w/2,
				'bottom, left': 'auto'
			},
			'sw': {
				'bottom, left': -w/2,
				'top, right': 'auto'
			},
			'se': {
				'bottom, right': -w/2,
				'top, left': 'auto'
			}
		}, true);



		/**
		 * @module resizable
		 */
		resizable = Resizable;
		return resizable;
	}

	var resizableExports = requireResizable();
	var Resizable = /*@__PURE__*/getDefaultExportFromCjs(resizableExports);

	return Resizable;

}));
//# sourceMappingURL=Resizable.js.map
