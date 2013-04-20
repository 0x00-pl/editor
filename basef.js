
function show(x){
    var ret=x+"{";
    for(i in x){
	ret+= i+"=";
	ret+= x[i]+", ";
    }
    ret+="}";
    return ret;         
}

function run_code(t){
    var res= eval(t);
    return res;
}

function escapeHtml(text) {
    return text
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
//from is array
function cmf(from, dest, fcollect, fmap, fflip){
    fcollect= fcollect||function(dest,val){};
    fmap= fmap||function(x){return x;};
    fflip= fflip||function(x){return true;};
    for(i in from){
	if(fflip(from[i])){
	    dest= fcollect(dest,fmap(from[i])); // iter with self-copy opt
	}
    }
    return dest;
}

function cmf_push(r,i){
    r.push(i);
    return r;
}

function cmf_concat(r,i){
    return r.concat(i);
}

var render= {
    static_hello:function(){
	this.show=function(){
	    return {
		toHtml:function(){
		    return escapeHtml("hello");
		}
	    }
	};
    }
};

var data_root={
    render_root:null,
};

function get_render(){
    var tmp= data_root.render_root();
    return tmp.toHtml();
}

function init(){
    data_root.render_root= (new render.static_hello()).show;
}
init();