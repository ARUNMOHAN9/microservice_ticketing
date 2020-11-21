import Link from 'next/link';

const Header = ({ currentuser }) => {
    const links = [
        !currentuser && { label: 'Sign Up', href: '/auth/signup' },
        !currentuser && { label: 'Sign In', href: '/auth/signin' },
        currentuser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href}>
                    <Link href={href}>
                        <a className="nav-link">{label}</a>
                    </Link>
                </li>
            );
        });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">GitTix</a>
            </Link>

            <ul className="nav">
                {links}
            </ul>
        </nav>
    );
}

export default Header;