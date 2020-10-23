function parse(cookie) {
    const cookies = new Object();

    if (typeof cookie !== "string" || cookie === "") {
        return cookies;
    }

    cookie
        .split(";")
        .map((c) => c.trim())
        .filter((c) => c !== "")
        .forEach((c) => {
            const [name, ...value] = c.split("=");
            cookies[name] = value.join("=");
        });

    return cookies;
}

function create({
        name,
        value,
        options: {
            expires = 0,
            secure = false,
            httponly = false,
            domain,
            path,
            samesite,
        },
    },
    response
) {
    let cookie = name + "=" + value;

    if (expires) {
        cookie += ";Expires=" + new Date(expires).toUTCString();
    }

    if (secure) {
        cookie += ";Secure";
    }

    if (httponly) {
        cookie += ";HttpOnly";
    }

    if (domain) {
        cookie += ";Domain=" + domain;
    }

    if (path) {
        cookie += ";Path=" + path;
    }

    if (samesite) {
        cookie += ";SameSite=" + samesite;
    }

    response.setHeader("Set-Cookie", cookie);
}

function destroy(name, response) {
    let cookie = name + "=;expires=";

    response.setHeader("Set-Cookie", cookie);
}

module.exports = {
    parse,
    create,
    destroy,
};