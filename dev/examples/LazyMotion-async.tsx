import * as React from "react"
import { m, LazyMotion, domAnimation } from "@framer"
import { useEffect, useState } from "react"

/**
 * An example of dynamically loading features from a different entry point.
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 0,
    borderRadius: 20,
}

const Component = React.memo(() => {
    return (
        <m.div
            animate={{
                width: [null, 50, 200, 100],
            }}
            transition={{
                duration: 2,
                easings: ["circOut", "circOut", "circOut"],
                times: [0, 0.1, 0.9, 1],
            }}
            style={style}
        />
    )
})

export const App = () => {
    return (
        <LazyMotion
            features={() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        import("./inc/dynamic-features").then((res) =>
                            resolve(res.default)
                        )
                    }, 2000)
                })
            }}
        >
            <Component />
        </LazyMotion>
    )
}
