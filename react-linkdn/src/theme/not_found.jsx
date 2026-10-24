
import {Link,useLocation} from 'react-router-dom'

export default function NotFound() {
    const {pathname} = useLocation()

    return (
        <section className='not-found'>
            <h1>404</h1>
            <p>No pagve at <code>{pathname}</code>.</p>
            <Link to="/">back to dashboard</Link>
        </section>
    )
}
