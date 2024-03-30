export default function SideListCard({ list,dotted }) {
    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button><span>{list}</span></button>
        </div>
    );
}