function parse(cookie) {
    const cookies = new Object({
        add(c, r) {
            let { name, value } = c;
            this[name] = value;
            return create(c, r);
        },
        remove(c, r) {
            delete this[c];
            return destroy(c, r);
        },
        exists(n) {
            return n in this && typeof this[n] === "string";
        },
        toJSON() {
            let results = {};
            Object.keys(this)
                .filter((name) => typeof this[name] === "string")
                .forEach((name) => (results[name] = this[name]));
            return results;
        },
        toString() {
            return JSON.stringify(this.toJSON());
        },
    });

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

function create({ name, value, options }, response) {
    let cookie = name + "=" + value;

    if (options) {
        let { expires, secure, httponly, domain, path, samesite } = options;

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

        if (typeof response === "object") {
            response.setHeader("Set-Cookie", cookie);
        }
    }

    return cookie;
}

function destroy(name, response) {
    let cookie = `${name}=;expires=${new Date(1).toUTCString()}`;

    if (typeof response === "object") {
        response.setHeader("Set-Cookie", cookie);
    }

    return cookie;
}

exports.cookie = {
    parse,
    create,
    destroy,
};