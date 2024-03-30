export default function SideListCard({ list,dotted,whenClicked }) {


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>whenClicked(list)}><span>{list}</span></button>
        </div>
    );
}