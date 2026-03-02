export default function rootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header>
                    [header]
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    [footer]
                </footer>
            </body>
        </html>
    );
}