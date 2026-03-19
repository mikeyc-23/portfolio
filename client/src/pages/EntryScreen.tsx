type Props = {
    onSelect: (value:string) => void
}

function EntryScreen({ onSelect }: Props) {

    return (  
        <div className="page e-entry">
            <div className="e-entry__content">
                <h1 className="e-entry__title">Michael Corrado</h1>
                <p className="e-entry__subtitle">Who are you?</p>
                    <div className="e-entry__buttons">   
                        <button className="e-entry__btn" onClick={()=>onSelect('terminal')}>Developer</button>
                        <button className="e-entry__btn" onClick={()=>onSelect('light')}>Recruiter</button>
                    </div>
            </div>
        </div>
    )
}

export default EntryScreen; 