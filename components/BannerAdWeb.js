import { useEffect, useRef } from 'react'

export default function BannerDesk() {
    const banner = useRef(null)

    const atOptions = {
        key: '0ecf031ab8296a5ea0b98aa91e96d87d',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
    }

    useEffect(() => {
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement('script')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

            banner.current.append(conf)
            banner.current.append(script)
        }
    }, [])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}
