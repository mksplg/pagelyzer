var dump_loaded = true;
var dump_text = '';
var cont=1;

function puts(s) {
	dump_text += s;
}

function textNode(pNode) {
	return(pNode.nodeType==3);
}

function rgb2hex(rgbString) {
	if (rgbString != 'rgba(0, 0, 0, 0)') {
		var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete (parts[0]);
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]).toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return '#'+parts.join('');
	} else {
		return '#ffffff'
	}
}

function css(pNode,prop) {
	return(document.defaultView.getComputedStyle(pNode,null).getPropertyValue(prop));
}

function walk(pNode,nLevel) {
	var tab = '';
	var src = '';
	var aux = '';
	for(var k=0;k<nLevel;k++) {tab+=' ';}
	var attr = \" uid='\"+cont+\"'\";
	if (pNode.id) {
		attr += \" id='\"+(pNode.id)+\"'\";
	} else {
		attr += \" id='element-\"+(cont)+\"'\";
	}
	attr += \" left='\"+new String(pNode.offsetLeft)+\"'\";
	attr += \" top='\"+new String(pNode.offsetTop)+\"'\";
	attr += \" width='\"+(new String(pNode.offsetLeft+pNode.offsetWidth))+\"'\";
	attr += \" height='\"+(new String(pNode.offsetTop+pNode.offsetHeight))+\"'\";
	if (pNode.style) {
		attr += \" margin_left='\"+(new String(css(pNode,'margin-left')))+\"'\";
		attr += \" background_color='\"+(new String(css(pNode,'background-color')))+\"'\";
		attr += \" font_size='\"+(new String(css(pNode,'font-size')))+\"'\";
		attr += \" font_weight='\"+(new String(css(pNode,'font-weight')))+\"'\";
		attr += \" display='\"+(new String(css(pNode,'display')))+\"'\";
		attr += \" visibility='\"+(new String(css(pNode,'visibility')))+\"'\";
		attr += \" style='\"+(pNode.style.cssText)+\"'\";
	}
	cont+=1;
	
		if (pNode.tagName == 'A') {
			if (pNode.href)
				attr += \" href='\"+pNode.href+\"'\";
		}
		
		if ((pNode.tagName!='TBODY') && (pNode.tagName!='IMG') && (pNode.tagName!='CANVAS') && (pNode.id!='fxdriver-screenshot-canvas')) {
			src += tab + '<'+pNode.tagName+' '+ attr+'>';
		}
		if (pNode.tagName=='IMG') {
			src += tab + \"<\"+pNode.tagName+\" \"+ attr +\" src='\"+pNode.src+\"' alt='\"+pNode.alt+\"'/>\";
		}
				
		for (var i = 0;i<pNode.childNodes.length;i++) {
			if (textNode(pNode.childNodes[i])) {
				src += pNode.childNodes[i].data.trim();
			} else {
				src += walk(pNode.childNodes[i],nLevel+1);
			}
		}
		
		if ((pNode.tagName!='TBODY') && (pNode.tagName!='IMG') && (pNode.tagName!='CANVAS') && (pNode.id!='fxdriver-screenshot-canvas')) {
			src += tab + '</'+pNode.tagName+'>';
		}
	return(src);
}

function dump_start() {
	var src = '';
	var now = new Date();
	var then = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDay()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	src += '<!-- window: {width : '+ window.innerWidth + ', height: ' + window.innerHeight+'} -->';
	src += '<!-- document: {width: '+ document.documentElement.offsetWidth + ', height: ' + document.documentElement.offsetHeight+'} -->';
	src += '<!-- page: {url: '+  location.href + ', date: '+ then + '} -->';
	src += walk(document.getElementsByTagName('html')[0],0);
	return(src);
}