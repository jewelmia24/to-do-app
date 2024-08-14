import { useCallback, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";


const SingleToDo = ({toDo,handleDelete,setTempState,tempState,setEditId,editId,handleUpdate}) => {
    const [toggle,setToggle] = useState(false)
    const {text,id} = toDo

    const handleEdit = useCallback (( id, text)=>{
        setTempState(text);
        setEditId(id);
    },[])

    return (
        <div className='border border-rose-400 px-2 mt-2 h-12 rounded-md flex justify-between items-center text-rose-400 text-xl'>
            
            {editId==id?<span> 
                        <input type="text" 
                            onChange={(e)=>setTempState(e.target.value)}
                            value={tempState}
                            className="focus:outline-none text-rose-400 flex-grow"
                        />
                    </span>:
                    <h3>{text}</h3>
            }
            <div className="flex items-center gap-6 flex-row-reverse">
                <MdDelete className="coursor-poiter" onClick={()=>handleDelete(id)}></MdDelete>
                <div onClick={()=>setToggle(!toggle)}>
                    {
                        toggle?<span><FaCheck onClick={()=>handleUpdate(id)}></FaCheck></span>:<span><CiEdit onClick={()=>handleEdit(id,text)}></CiEdit></span> 
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleToDo;