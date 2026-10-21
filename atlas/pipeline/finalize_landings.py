"""Encode verified fixed-camera browser captures and generate landing QA sheets."""
import sys
if '--density=2' in sys.argv:
 from landing_2x import finish
else:
 from fixed_landings import finish
if __name__=="__main__":finish()
