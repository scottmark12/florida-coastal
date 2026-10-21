"""Stage fixed cameras, checking mainland cores before island exceptions."""
from fixed_landings import plan,refine_mainland,refresh_callouts
if __name__=="__main__":
 plan()
 refine_mainland()
 refresh_callouts()
