import Alert from '@mui/material/Alert';


const AlertWarning = (props)=>{
    return (
        <>
            <Alert variant='filled'  severity="warning">
                {props.text}
            </Alert>        
        </>
    )
}

export default AlertWarning