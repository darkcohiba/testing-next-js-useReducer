import { useRouter } from 'next/router'
var string = require('lodash/string');



export default function NamePage (){
    const router = useRouter()
    const {name} = router.query
    
    return (
        <>
        {string.upperFirst(name)}'s Page
        </>
    )
}