#include <string>
#include <vector>
#include <fstream>
#include <iostream>
#include <tr1/regex>

using namespace std;

/*
 * **********************************************************************
 * MSMSdata class:
 * 		Contains the precursorMz, precursorCharge, and retentionTime
 * 		data for MS/MS spectra identified by the programs first pass
 * 		through the mzXML.
 */

class MSMSdata{
	public:
	MSMSdata();
	void setprecursorMz(float in);
	void setprecursorCharge(int in);
	void setretentionTime(string in);
	
	// the following get functions will set *retVal equal to the desired
	// property if the member is valid (i.e. it was legitimately set by
	// the input loop), and return true if the member is valid, else false
	int getprecursorMz(float *retVal);
	int getprecursorCharge(int *retVal);
	int getretentionTime(string *retVal);
	
	private:
	float	precursorMz;
	int 	precursorCharge;
	string 	retentionTime;
	bool 	precursorMzValid,
			precursorChargeValid,
			retentionTimeValid;
};

// constructor
MSMSdata::MSMSdata()
{
	precursorMz 			= 0;
	precursorCharge 		= 0;
	retentionTime 			= "";
	precursorMzValid 		= false;
	precursorChargeValid 		= false;
	retentionTimeValid 		= false;
}

// setters
void MSMSdata::setprecursorMz(float in)
{
	precursorMz 			= in;
	precursorMzValid 		= true;
}

void MSMSdata::setprecursorCharge(int in)
{
	precursorCharge 		= in;
	precursorChargeValid 		= true;
}

void MSMSdata::setretentionTime(string in)
{
	retentionTime 			= in;
	retentionTimeValid 		= true;
}

// getters - read Class definition for usage
int MSMSdata::getprecursorMz(float *retVal)
{
	if (precursorMzValid)
		*retVal = precursorMz;
		
	return precursorMzValid;
}

int MSMSdata::getprecursorCharge(int *retVal)
{
	if (precursorChargeValid)
		*retVal = precursorCharge;
		
	return precursorChargeValid;
}

int MSMSdata::getretentionTime(string *retVal)
{
	if (retentionTimeValid)
		*retVal = retentionTime;
		
	return retentionTimeValid;
}

/*
 * end MSMSdata class
 ***********************************************************************
 */

bool lineContains(string line, string substr)
{
		return  string::npos != line.find(substr);
}

int main(int argc, char* argv[])
{
	if (argc < 2) 
	{ 	
		cout << "Usage: ./parse <filepath>" << endl;
		return 1; 
	}
	
	// declare file reading variables
	vector<string> file;
	vector<MSMSdata*> vecMSMSdata;
	bool 	flNextLoop			= false,
		atEOF				= false,
		firstCheck			= false;
			
	string 	line				= "",
		strmsLevel2 			= "msLevel=\"2\"",
		scan				= "<scan";
			
	MSMSdata * msmsdata;
	
	// open and read mzXML file, extracting relevant MS/MS spectra data
	file.clear();
	ifstream infile (argv[1], ios_base::in);
	
	// attempt the first file read
	atEOF = !getline(infile, line, '\n');
	
	// first reading loop - this and the appropriate variables will go in
	// its own procedure eventually 
	while (!atEOF)
	{
		// read until we find a chunk of MS/MS data
		flNextLoop = false;
		while  (!atEOF && !flNextLoop)
		{
			if ( !atEOF && lineContains(line, strmsLevel2) )
			{
				/* found one! create a new MSMSdata object and try to
				 * parse out its corresponding data */
				msmsdata = new MSMSdata();
				flNextLoop = true;
				firstCheck = true;
			}
			else if ( !atEOF )
			{
				atEOF = !getline(infile, line, '\n');
			}
		}
		
		// search for this objects' data until we reach the next scan
		flNextLoop = false;
		while  (!atEOF && !flNextLoop)
		{
			if ( !firstCheck && lineContains(line, scan) )
			{
				/* since firstCheck is false, we have already passed the
				 * line where we first saw msLevel="2", so we must have
				 * passed the end of msmsdata's data segment. proceed to
				 * next loop */
				vecMSMSdata.push_back(msmsdata);
				flNextLoop = true;
			}
			else if (false /**** TODO: add the lineContains conditions here to actually parse out the information****/)
			{
				
			}
			else
			{
				atEOF = !getline(infile, line, '\n');
				
			}
			
			firstCheck = false;
			
		}
	}// end main reading loop

/*
	// print the data we found
	for (vector<string>::iterator i = file.begin(); i != file.end(); ++i)
	{
		cout << (*i) << endl;
	}
*/
	return 0;
}
