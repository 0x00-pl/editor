if __name__=="__main__":
    import io
    import sys
    import os
    def fflip(line):
        if line.find(":")!=-1 : return True;
        if line.find("={")!=-1 : return True;
        if line.find("=")!=-1 and line.find("function")!=-1 : return True;
        if line.find("=")!=-1 and line.find("this")!=-1 : return True;
        return False

    if len(sys.argv)>0 :
        src= "basic_text.js"
    fi= open(src,"r")
    lines= fi.readlines();
    fi.close()
    defs= ["this file is make from ../get_js_decl.py \n"]
    defs= defs+["%04d"%(line_no+1)+"|"+i for line_no,i in zip(range(len(lines)),lines) if fflip(i)]
    os.makedirs("midfile",exist_ok=True)
    fo= open("midfile/decl."+src, "w")
    fo.writelines(defs)
    fo.close()
    #os.system("pause")
