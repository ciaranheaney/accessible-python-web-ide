import sys
import resource
try:
    import seccomp
except ImportError:
    import pyseccomp as seccomp



MEMORY_LIMIT = 64 * 1024 * 1024  # 64kb
CPU_TIME_LIMIT = 1  # 1sec
WRITE_LIMIT = 512  # 512bytes


def drop_perms():
    # respond with EPERM: operation not permitted so users can tell
    # they're being blocked from doing something
    filter = seccomp.SyscallFilter(seccomp.ERRNO(seccomp.errno.EPERM))

    # allow `write`ing to two already-opened files stdout and stderr
    filter.add_rule(
        seccomp.ALLOW, "write", seccomp.Arg(0, seccomp.EQ, sys.stdout.fileno())
    )
    filter.add_rule(
        seccomp.ALLOW, "write", seccomp.Arg(0, seccomp.EQ, sys.stderr.fileno())
    )
    filter.add_rule(
        seccomp.ALLOW, "read", seccomp.Arg(0, seccomp.EQ, sys.stdin.fileno())
    )

    # load the filter in the kernel
    filter.load()


def set_mem_limit():
    # virtual memory
    resource.setrlimit(resource.RLIMIT_AS, (MEMORY_LIMIT, MEMORY_LIMIT))
    # cpu time
    resource.setrlimit(resource.RLIMIT_CPU, (CPU_TIME_LIMIT, CPU_TIME_LIMIT))
    # write limit i.e. don't allow an infinite stream to stdout/stderr
    resource.setrlimit(resource.RLIMIT_FSIZE, (WRITE_LIMIT, WRITE_LIMIT))


if __name__ == "__main__":
    code = sys.argv[1]
    user_input = sys.argv[2]
    set_mem_limit()
    drop_perms()
    # command = f'echo "{user_input}" | python3 -c "{code}"'
    # os.system(command)
    exec(code)