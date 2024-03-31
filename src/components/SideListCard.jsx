import deleteicon from '/deleticon.svg';
export default function SideListCard({ list,dotted,whenClicked ,taskDelete}) {

    function handleDelete() {
        taskDelete(list);
    }


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>whenClicked(list)}><span>{list}</span></button>
            {dotted ? <></>:<button onClick={handleDelete}><img src={deleteicon} alt="" /></button>}
        </div>
    );
}