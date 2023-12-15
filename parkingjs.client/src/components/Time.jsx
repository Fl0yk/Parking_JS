import { observer } from "mobx-react-lite"
import { useState } from 'react'

function Time() {
    const [curDate, setCurDate] = useState(new Date());
    const timeZone = curDate.getTimezoneOffset() / (-60);

    return (
        <>
            <p>Current local date: {curDate.toLocaleDateString()} |
                Timezone: UTC{timeZone > 0 ? <>+</> : <></>}{ timeZone } | 
            </p>
            
        </>
    );
}

export default observer(Time);