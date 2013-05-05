
function fnil(){}

function show(x){
    var ret=x+"{";
    for(i in x){
	ret+= i+"=";
	ret+= show(x[i])+", ";
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

function cmf_push(r,i){
    r.push(i);
    return r;
}
function cmf_concat(r,i){
    return r.concat(i);
}
function cmf(from, dest, fcollect, fmap, fflip){
    fcollect= fcollect||function(dest,val){};
    fmap= fmap||function(x,key){return x;};
    fflip= fflip||function(x){return true;};
    for(i in from){
	if(fflip(from[i])){
	    dest= fcollect(dest,fmap(from[i],i)); // iter with self-copy opt
	}
    }
    return dest;
}

function mr_push(r,i){
    r.push(i);
    return r;
}
function mr_concat(r,i){
    return r.concat(i);
}
function mr_mkcond(cond){
    cond= cond||function(val){return true;}
    return function(collect,val){
	if(cond(val)){
	    return collect.push(val);
	}else{
	    return collect;
	}
    };
}
function mr(dst,src,freduce,fmap){
    freduce= freduce||function(collect,val){return collect;};
    fmap= fmap||function(val,key){return val;}
    for(key in src){
	dst= freduce(dst, fmap(src[key],key));
    }
    return dst;
}
