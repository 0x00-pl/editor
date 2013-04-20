
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

function append_arr(r,i){
    r.push(i);
    return r;
}

function concat_string(r,i){
    return r.concat(i);
}
function concat_arr(r,i){
    return r.concat(i);
}

