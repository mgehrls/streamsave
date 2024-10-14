function Footer() {
    return (
        <footer className="mt-auto">
            <div className="flex flex-col items-center justify-center bg-black px-8 py-8">
                <p className="text-md text-slate-200">
                &copy; 2023 StreamSave. All rights reserved.
                </p>
                <p className="text-md text-slate-200">
                data and images courtesy of{" "}
                    <a
                        className="font-bold underline"
                        href="https://www.themoviedb.org/"
                    >
                        themoviedb.org
                    </a>
                </p>
            </div>  
        </footer>
    )
}

export default Footer;