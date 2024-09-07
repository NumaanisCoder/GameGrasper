import { useEffect, useRef } from 'react'

export default function BannerMobile() {
    const banner = useRef(null)

    const atOptions = {
        key: 'acaac523deb4aacb90748f33904788c0',
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
