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
